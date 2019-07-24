import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import {editDocument} from '../action/edit-document';
import {Button, Icon, Form} from 'semantic-ui-react';
import Input from './input';
import {Redirect} from 'react-router-dom'
import {API_BASE_URL} from '../../../config'
import axios from 'axios';
import {required, nonEmpty} from '../../../validators';
import './documents.css';
import '../../../containers/dashboard/dashboard';

export class DocumentEdit extends React.Component {
  constructor(props){
    super(props);
    this.fileInputEl = React.createRef();
  }

  goBack = () => this.props.history.goBack();

  onSubmit(values) {
    const {documentName, notes, healthProviderName} = values;
    const {username} = this.props.auth.currentUser;
    const { id } = this.props.match.params;
    const documentUpload = {documentName, notes, healthProviderName, username};

    //uploading imagefile to aws
    let formData = new FormData();
    const imagefile = this.fileInputEl.current.files[0];
    formData.append("documentFile", imagefile);
    formData.append("documentName", documentName);
    formData.append("notes", notes);
    formData.append("healthProviderName", healthProviderName);
    formData.append("username", username);
    console.log(formData);

    axios.put(`${API_BASE_URL}/documents/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })

    return this.props
        .dispatch(editDocument(id, documentUpload))
        .then(()=>{
          this.props.history.push('/Dashboard/Documents');
        })
  }

  render() {
    const { documents, document, match } = this.props;
    if(!documents || !documents.length){
      return <Redirect to="/Dashboard/Documents" />;
    }
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
                  //value={document.documentName}
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
                  //value={document.notes}
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
                  //value={document.healthProviderName}
                  validate={[required, nonEmpty]}
                />
              </ul>
              <ul>
                  <label htmlFor="documentFile">Document: <a href={document.documentURL}>{document.documentURL}</a></label>
                  <input 
                    ref={this.fileInputEl}
                    id="documentFile"  type="file" name="documentFile"/>
                  </ul>
            </li>
            <Button disabled={this.props.pristine || this.props.submitting}>
                Add
            </Button>
            <Button type="button" onClick={ () => {
                this.props.history.push('/Dashboard/Documents');
            }}>Cancel</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) =>{

  const { match } = ownProps; // <- component props
  const { documents } = state;

  // console.log('mapStateToProps', { documents, match })
  if(!documents || !documents.length){
      return {};
    }
  const document =  documents.find( doc => doc.id === match.params.id );
  return {
    documents:state.documents,
    auth:state.auth,
    initialValues: document,
    document
  }
}

export default connect(mapStateToProps)(reduxForm({
  form: 'documentform',
  onSubmitFail: (errors, dispatch) => dispatch(focus('documentName', 'healthProviderName'))
})(DocumentEdit))




// export default reduxForm({
//   form: 'documentform',
//   onSubmitFail: (errors, dispatch) => dispatch(focus('documentName', 'healthProviderName'))
// })(connect(mapStateToProps)(DocumentEdit));
