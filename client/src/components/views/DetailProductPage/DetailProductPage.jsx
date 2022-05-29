import React, { useEffect, useState } from 'react';
import './detailProductPage.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Col, Row } from 'antd';

const DetailProductPage = () => {
  const params = useParams();

  const [Product, setProduct] = useState({});

  const productId = params.productId;

  useEffect(()=> {
    axios.get(`/api/products/productDetail?id=${productId}&type=single`)
      .then(response => {
        setProduct(response.data[0]);        
      })
      .catch(err => alert(err))
  },[])

  return (
    <div className="detailMain">
      <div className="detailTitle"> 
        <h1>{Product.title}</h1>
      </div>

      <br />

      <Row gutter={16,16}>
        <Col lg={12} sm={24}>
          {/* Product Image */}
          <ProductImage detail={Product} />
        </Col>

        <Col lg={12} sm={24}>
          {/* Product Information */}
          <ProductInfo detail={Product} />
        </Col>
      </Row>

      

      

    </div>
  )
};


export default DetailProductPage
