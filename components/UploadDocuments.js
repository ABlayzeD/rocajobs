import React, {Component} from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {firebase, auth} from '../services/firebase';
import FileUploader from "react-firebase-file-uploader";

class UploadDocuments extends Component{
    state = {
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: ""
    };
    handleUploadStart = (file) => {
      this.setState({ isUploading: true, progress: 0 });
    }
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
      this.setState({ isUploading: false });
      console.error(error);
    };
    handleUploadSuccess = filename => {
      
      this.setState({ avatar: filename, progress: 100, isUploading: false });
      firebase
        .storage()
        .ref("documents")
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({ avatarURL: url }));
    };
    render(){
        return(
          <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}>
            Upload Secondary Documents (Multiple)
            <FileUploader
              hidden
              multiple
              accept=".pdf, .doc, .docx"
              name="avatar"
              storageRef={firebase.storage().ref(auth.currentUser.uid.concat("/documents"))}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </label>
        )
    }
}
export default UploadDocuments;