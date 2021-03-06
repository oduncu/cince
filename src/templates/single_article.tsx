import React, { useEffect } from 'react';

import { Layout } from '../components/layout';
import SEO from '../components/seo';
import { Article } from '../components/article';
import styled from 'styled-components';
import { Sidebar } from '../components/sidebar';
import { ArticleData, BlogData } from '../types/blog';
import { ShareButton } from '../components/share_button';

type SingleArticlePageProp = {
  pageContext: {
    blogData: BlogData;
    articleData: ArticleData;
  };
};

type SingleArticlePageComponentProp = {
  className?: string;
} & SingleArticlePageProp;

const StyledSidebar = styled(Sidebar)`
  margin-left: 1em;
  width: 350px;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

const SingleArticlePageComponent = (props: SingleArticlePageComponentProp) => (
  <Layout siteMetadata={{ title: 'Subterranean Flower Blog' }} headerLinkTo="/blog/">
    <SEO title={props.pageContext.articleData.title} description={props.pageContext.articleData.excerpt} />
    <div className={props.className}>
      <Article className="page-article" articleData={props.pageContext.articleData} />
      <StyledSidebar blogData={props.pageContext.blogData} />
      <ShareButton/>
    </div>
  </Layout>
);

const StyledSingleArticlePageComponent = styled(SingleArticlePageComponent)`
  display: flex;
  justify-content: center;
  padding-bottom: 5em;

  & .page-article {
    flex: 1;
  }
`;

export const SingleArticlePage = (props: SingleArticlePageProp) => {
  useEffect(() => {
    const prismPath = '/prism.js';
    window.document.body.classList.add('line-numbers');
    // @ts-ignore
    import(/* webpackIgnore: true */ prismPath).then(({default: Prism}) => {
      Prism.highlightAll(true);
    });
  }, [props.pageContext.articleData.pagePath]);

  return <StyledSingleArticlePageComponent {...props} />;
};

export default SingleArticlePage;
