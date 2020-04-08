import React from 'react';
import { Layout, Button } from 'antd';
import {footerCls} from './styles'
import reindexFirebaseToAlgolia from '../../../scripts/adminscripts/reindexFirebaseToAlgolia';

const AppFooter = Layout.Footer;
const Footer = () => (
 <AppFooter css={footerCls}>
  CSC 4101 - Group H - ROCA.sa Network
  <Button type="ghost" onClick={reindexFirebaseToAlgolia}> reindex job listings...</Button>
 </AppFooter>
);
export default Footer;