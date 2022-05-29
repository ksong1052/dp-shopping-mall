import React, { useState } from 'react';
import './uploadProductPage.scss';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const Continents = [
  { key:1, value: "Africa" },
  { key:2, value: "Europe" },
  { key:3, value: "Asia" },
  { key:4, value: "North America" },
  { key:5, value: "South America" },
  { key:6, value: "Australia" },
  { key:7, value: "Antarctica" },
]

const UploadProductPage = (props) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [continent, setContinent] = useState(1);
  const [images, setImages] = useState([]);

  const titleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.currentTarget.value);
  };

  const priceHandler = (e) => {
    setPrice(e.currentTarget.value);
  };

  const continentHandler = (e) => {
    setContinent(e.currentTarget.value);
  };

  const updateImages = (newImages) => {
    // console.log({newImages});
    setImages(newImages);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    // 유효성 
    if(!title || !description || !price || !continent || !images) {
      return alert('모든 값을 넣어 주셔야 합니다.');
    }

    const body = {
      // 로그인 된 사람의 ID
      writer: props.user.userData._id,
      title,
      description,
      price,
      images,
      continent
    }

    axios.post('/api/products', body)
      .then(response => {
        if(response.data.success) {
          alert('Succeeded to upload Procuct!');
          navigate('/');
        } else {
          alert('Fail to upload Product!');
        }
      })
  }
 
  return (
    <div className="uploadMain">
      <div className="upoload">
        <h2>Uploading Travel Products</h2>
      </div>
      
      <Form onSubmitCapture={submitHandler}>
        {/* Dropzone */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Title*</label>
        <Input value={title} onChange={titleHandler} />
        <br />
        <br />
        <label>Description*</label>
        <TextArea value={description} onChange={descriptionHandler} />
        <br />
        <br />
        <label>Price($)*</label>
        <Input value={price} onChange={priceHandler} />
        <br />
        <br />
        <label>Continent*</label>
        <select className="continentType" onChange={continentHandler} value={continent}>
          {
            Continents.map((continent) => (
              <option key={continent.key} value={continent.key}>{continent.value}</option>
            ))
          }          
        </select>
        <br />
        <br />
        <Button htmlType="submit">Send</Button>
      </Form>

    </div>
  )
}

export default UploadProductPage
