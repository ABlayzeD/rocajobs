import React, {Component} from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {firebase, auth} from '../services/firebase';
import FileUploader from "react-firebase-file-uploader";

class UploadAvatar extends Component{
    state = {
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: ""
    };
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
      this.setState({ isUploading: false });
      console.error(error);
    };
    handleUploadSuccess = filename => {
      this.setState({ avatar: filename, progress: 100, isUploading: false });
      firebase
        .storage()
        .ref("avatar")
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({ avatarURL: url }));
    };
    render(){
        return(
          <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}>
            Upload Avatar
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            {this.state.avatarURL && <img src={this.state.avatarURL} />}
            <FileUploader
              hidden
              accept=".jpg, .png"
              name="avatar"
              filename="avatar"
              storageRef={firebase.storage().ref(auth.currentUser.uid.concat("/avatar"))}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </label>
        )
    }
}
export default UploadAvatar;