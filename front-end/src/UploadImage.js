import React from 'react'

function UploadImage() {
  return (
    <div>
      <label >Upload your Profile Pic</label>  
      <input style={{margin :"10px"}} type="file" name ="profileImage"/>
    </div>
  )
}

export default UploadImage
