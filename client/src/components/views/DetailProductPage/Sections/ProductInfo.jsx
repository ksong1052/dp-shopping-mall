import React from 'react';
import { Descriptions, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../../../_actions/user_action';

const ProductInfo = ({ detail }) => {
  const dispatch = useDispatch();  
  const navigate = useNavigate();

  const onClickHandler = (e) => { 
    // 필요한 정보를 Cart field에 넣어 준다.
    dispatch(addToCart(detail._id));
    navigate('/users/cart');
  }

  return (
    <div>
      <Descriptions title="Product Information" layout="vertical" bordered>
        <Descriptions.Item label="Price">{detail.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{detail.view}</Descriptions.Item>
        <Descriptions.Item label="Description">{detail.description}</Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button size="large" shape="round" type="danger" onClick={onClickHandler}>
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export default ProductInfo
