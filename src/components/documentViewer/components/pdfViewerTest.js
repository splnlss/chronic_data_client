import React from 'react';
import axios from 'axios';
import {AWS_BASE_URL} from '../../../config';


export default function PDFViewerTest(props){
  
    const imgUrl = AWS_BASE_URL+props.match.params.id;

    if (imgUrl){
      console.log(imgUrl)
      axios(`${imgUrl}`, {
        method: 'GET',
        responseType: 'blob' //Force to receive data in a Blob Format
      })
      .then(response => {
      //Create a Blob from the PDF Stream
          const file = new Blob(
            [response.data], 
            {type: 'application/pdf'});
      //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
          window.open(fileURL);
      })
      .catch(error => {
          console.log(error);
      });
    }
    
    return (
      <div>
            <div className="document">
              <img src={imgUrl} max-width="600"/>
              <br></br>
              <a href={imgUrl}>Download Link</a>
            </div>
      </div>
    )
  }

