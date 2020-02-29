import Head from 'next/head';
import React from 'react';
import { css } from '@emotion/core';
import {
 node, string, oneOfType, object
} from 'prop-types';
import { Layout } from 'antd';


const layoutCls = css`
  background:linear-gradient(transparent,rgb(218,165,32));
  font-family: open-sans;
`;

const Container = ({
  children, 
  title = "ROCAjobs"
}) => (
 <Layout css={layoutCls} className="layout">
  <Head>
   <title>{title}</title>
  </Head>
  {children}
 </Layout>
);
Container.propTypes = {
 children: oneOfType([node, string]),
 title: string,
};
export default Container;