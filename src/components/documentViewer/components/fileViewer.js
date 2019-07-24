import React from 'react';
import {AWS_BASE_URL} from '../../../config';


export default function FileViewer(props){
  
    const imgUrl = AWS_BASE_URL+props.match.params.id;
    if (imgUrl){
      console.log(imgUrl)
    }

    return (
      <div>
            <div className="document">
              <img src={imgUrl} alt="document file" max-width="600"/>
              <br></br>
              <a href={imgUrl}>Download Link</a>
            </div>
      </div>
    )
  }

