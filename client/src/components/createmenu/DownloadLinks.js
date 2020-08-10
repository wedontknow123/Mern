import React  from 'react';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
const DownloadLinks = ({filenames,onClic,deleteFile}) => {
 //filenames.indexOf(fn)*31
  const linkList = filenames.length ? (
    filenames.map(fn =>{        
        return(
        <span key={filenames.indexOf(fn)}>          
          <a href="#" onClick={() => {onClic(filenames.indexOf(fn))}}  title="Click to Download and Preview">{fn.Document_Name} </a>
          <label id={filenames.indexOf(fn)}> </label>
          <IconButton onClick={() => {deleteFile(filenames.indexOf(fn),fn.Document_Name)}} id={fn.Document_Name} title="File will get deleted from the server">
            <Delete/>
          </IconButton>          
          <br></br>
        </span>        
        )
      })   
  ) : (
    <p>No Uploaded Files</p>
  );

  return (
    <div className="download links">
      {linkList}
    </div>
  )
}

export default DownloadLinks;