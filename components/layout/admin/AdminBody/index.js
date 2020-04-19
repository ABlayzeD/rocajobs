
import React, { Component } from 'react';
import clientSideJobReindexFirebaseToAlgolia from '../../../../scripts/adminscripts/indexingalgoliascripts/clientSideJobReindexFirebaseToAlgolia';
import {Button} from 'antd';
import Router from 'next/router';

class AdminBody extends Component {
    
    constructor(props){
        super(props);
        
    }
    render() {
        
        return (
            <div>
                <Button
                type="ghost"
                onClick={clientSideJobReindexFirebaseToAlgolia}>
                    reindex job listings for users
                </Button>
                <Button
                type="ghost"
                onClick={function(){
                    Router.push("/admin_listadmins")
                }
                }>
                    List admins/employers
                </Button>
                <Button
                type="ghost"
                onClick={function(){
                    Router.push("/admin_addjob")
                }
                }>
                    Add a job
                </Button>
            </div>
    );
}
}

export default AdminBody;