import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const FileUpload = ({ refreshFunction }) => {

  const [images, setImages] = useState([]);

  // Dropzone에서 이미지 업로드 & 이미지 uploads 폴더에 저장
  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { 'content-type': 'multipart/form-data' }
    }
    formData.append("file", files[0]);

    axios.post('/api/products/image', formData, config)
      .then(response => {
        if(response.data.success) {
          // console.log(response.data);
          setImages([...images, response.data.filePath]);
          refreshFunction([...images, response.data.filePath]);
        } else {
          alert("Fail to save the files")
        }
      });   
  }

  // 원하지 않는 이미지 제거 (이미지 클릭시)
  const deleteHandler = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    refreshFunction(newImages);
  }

  return (
    <div style={{display:'flex', justifyContent:'space-between'}}>
      <Dropzone onDrop={dropHandler}>
        {({getRootProps, getInputProps}) => (
            <section>
            <div 
                style={{
                    width: 300, height: 240, border: '1px solid lightgray',
                    display: 'flex', alignItems: 'center', justifyContent:'center'
                }}
                {...getRootProps()}>
                <input {...getInputProps()} />
                <PlusOutlined style={{fontSize: '3rem'}} />
            </div>
            </section>
        )}
      </Dropzone>

      <div style={{ display: 'flex', width: '350px', height: '250px', marginLeft: '10px', overflowX: 'scroll' }}>
        {
          images.map((image, index) => (
            <div key={index} onClick={() => deleteHandler(image)}>
              <img 
                style={{ minWidth: '300px', width: '300px', height: '230px' }}
                src={`http://localhost:5000/${image}`}
              />
            </div>  
          ))
        }
      </div>

    </div>
  )
}

export default FileUpload
