import React from 'react';
import {connect} from 'react-redux'
import '../../../containers/dashboard/dashboard';
import { fetchDocuments } from '../action/fetch-documents';
import { Link } from 'react-router-dom';
import Card from './card';

export class DocumentList extends React.Component {

  componentDidMount(){
    this.props.fetchDocuments();
  }
  
  goBack = () => this.props.history.goBack();

  render(){
    const { documents } = this.props;
    return (
      <div className="document">
        <div onClick={this.goBack} className="close-button">X</div>
        <h2>Documents</h2>
        <ul>
        { documents && documents.map(document => (
          <Card id={document.id} name={document.documentName} provider={document.healthProviderName}></Card>
        ))}
        </ul>
      </div>
      )
  }
}

const mapStateToProps = (state) =>{
  return {auth:state.auth, documents: state.documents}
}
const mapDispatchToProps = (dispatch) => {
  return {fetchDocuments: () => { // this.props.fetchDocuments
    dispatch(fetchDocuments())
  }}
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList)

