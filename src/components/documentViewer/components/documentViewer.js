import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {Button, Icon, Form} from 'semantic-ui-react';
import './documentViewer.css';

import '../../../containers/dashboard/dashboard';
import {API_BASE_URL} from '../../../config';

import { Link } from 'react-router-dom'
import { Dashboard } from '../../../containers/dashboard/dashboard';

export class DocumentViewer extends React.Component {
  state = {document:null}

  componentDidMount(){
  const { documents, match } = this.props;
  const document = documents.find( doc => doc.id === match.params.id );
  if(!document){
    fetch(`${API_BASE_URL}/documents/${match.params.id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
      },
      body: JSON.stringify()
      })
    //   .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(document => {
        this.setState({document:document})
      })
      .catch(err => {
          const {reason, message, location} = err;
        
        })
    }
  }

  deleteHandler = () => {
    const { match } = this.props;
    fetch(`${API_BASE_URL}/documents/${match.params.id}`, {
      method: 'Delete',
      headers: {
          'content-type': 'application/json'
    },
    body: JSON.stringify()
    })
    .then(responses  => {
      console.log("delete:" + responses)
    })
    .then(()=>{
      this.props.history.push('/Dashboard/Documents');
    })
  }

  goBack = () => this.props.history.goBack();

  render(){
  
    let {document} = this.state;
    const {documents, match} = this.props;
    if(!document){
      document = documents.find( doc => doc.id === match.params.id );
    }
    return (
      <div>
          <div className="document">
            <div onClick={this.goBack} className="close-button">X</div>
            <div className="documentInfo">
            <h3>{document ? document.documentName.toUpperCase() : ''}</h3>
            {document ? 
                <div>
                  <p>Health Provider: {document.healthProviderName}</p>
                  <p>Notes: {document.notes}</p>
                  <p>Document: </p>
                  <br></br>
                  {document.documentURL ? 
                    <Link to={`/image/${document.documentURL.slice((document.documentURL.lastIndexOf('/')+1))}`}><img src={document.documentURL} width="200" height="auto"></img></Link>
                  : ''}
                  <br/>
                  {document.documentURL ? <a href={document.documentURL}>Download Original File</a> : ''}
                  <div className="Edit">
                    <p>
                      {/* <button onClick={this.editHandler(document.id)}>Edit</button> */}
                      <Link to={`/documents/edit/${document.id}`} component="button"><Button type="button">Edit</Button></Link>
                      <Button onClick={ () => {
                         if(window.confirm('Are you sure you want to delete this document?')){
                           this.deleteHandler()
                          }}}>Delete</Button>
                    </p> 
                  </div>
                </div>
              : ''}
          </div>
            </div>
      </div>
      )
  }
}

const mapStateToProps = (state) =>{
  return {auth:state.auth, 
    documents: state.documents}
}

export default withRouter(connect(mapStateToProps)(DocumentViewer))

