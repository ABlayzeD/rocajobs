import React, { Component } from 'react';
import Link from 'next/link';
import AdminRightMenu from './AdminRightMenu';
import {headerCls} from './styles';
import {connect} from 'react-redux';

class AdminHeader extends Component {
  render() {
    return (
      <div css={headerCls}>
        <nav className="menuBar">
          <div className="logo">
            <Link href="/admin_console">
              <img src="/images/logo.png" alt={"Logo"} />
            </Link>
          </div>
          <div className="menuCon">
            <div className="rightMenu">
              <AdminRightMenu />
            </div>
          </div>
        </nav>
      </div>
    );
    
  }
}

export default AdminHeader;