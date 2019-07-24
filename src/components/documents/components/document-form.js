import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import {Button, Form} from 'semantic-ui-react';
import {submitDocument} from '../action/submit-document';
import Input from './input';
import {API_BASE_URL} from '../../../config'
import axios from 'axios';
import {required, nonEmpty} from '../../../validators';
import './documents.css';
import '../../../containers/dashboard/dashboard';

export class DocumentForm extends React.Component {
    constructor(props){
      super(props);
      this.fileInputEl = React.createRef();
    }

    goBack = () => this.props.history.goBack();

    onSubmit(values) {
      const {documentName, notes, healthProviderName, documentFile} = values;
      const {username} = this.props.auth.currentUser;
      let documentUpload = {documentName, notes, healthProviderName, username};
      
      //uploading imagefile to aws
      let formData = new FormData();
      const imagefile = this.fileInputEl.current.files[0];
      formData.append("documentFile", imagefile);
      formData.append("documentName", documentName);
      formData.append("notes", notes);
      formData.append("healthProviderName", healthProviderName);
      formData.append("username", username);
      console.log(formData);

      axios.post(`${API_BASE_URL}/documents`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })
      .then((results)=>{
        // console.log(results.data.imageUrl)
        // documentUpload = {...documentUpload, documentURL:results.data.imageUrl}
        // this.props.dispatch(submitDocument(documentUpload))
        console.log("dispatch submitted")
        this.props.history.push('/Dashboard/Documents');
       
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    
    render() {
     
      return (
         <div className="document">
            <div onClick={this.goBack} className="close-button">X</div>

            <Form className="document-form" onSubmit={this.props.handleSubmit(values =>
              this.onSubmit(values)
             )}>
                <li>
                <ul>
                    <label htmlFor="documentName">Document Name:</label>
                    <Field
                      component={Input}
                      type="text"
                      name="documentName"
                      id="documentName"
                      validate={[required, nonEmpty]}
                    />
                  </ul>
                  <ul>
                    <label htmlFor="notes">Notes:</label>
                    <br></br>
                    <Field
                      component="textarea" 
                      type="text"
                      name="notes"
                      id="notes"
                      validate={[]}
                    />
                  </ul>
                  <ul>
                    <label htmlFor="healthProviderName">Health Provider:</label>
                    <Field
                      component={Input}
                      type="text"
                      name="healthProviderName"
                      id="healthProviderName"
                      validate={[required, nonEmpty]}
                    />
                  </ul>
                  <ul>
                  <label htmlFor="documentFile">Document:</label>
                  <input 
                    ref={this.fileInputEl}
                    id="documentFile"  type="file" name="documentFile"/>
                  </ul>
                </li>
                <Button disabled={this.props.pristine || this.props.submitting}>
                    Add
                </Button>
                <Button type="button" type="button" onClick={ () => {
                     this.props.history.push('/Dashboard/Documents');
                 }}>Cancel</Button>
            </Form>  
          </div>
        );
    }
}

const mapStateToProps = (state) =>{
  return {auth:state.auth}
}

export default reduxForm({
  form: 'documentform',
  onSubmitFail: (errors, dispatch) => dispatch(focus('documentName', 'healthProviderName'))
})(connect(mapStateToProps)(DocumentForm));

// export default requiresLogin()(connect(mapStateToProps)(Dashboard));
