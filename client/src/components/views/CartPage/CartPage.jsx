import React, { useEffect, useState } from 'react';
import './cartPage.scss';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_action';
import UserCardBlock from './Sections/UserCardBlock';
import { Empty, Result } from 'antd';
import Paypal from '../../utils/Paypal';

const CartPage = (props) => {
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

  const dispatch = useDispatch();
  
  useEffect(() => {
    let cartItems = [];
    
    // Redux User State의 cart안에 상품에 대한 정보가 들어 있는지 확인
    if(props.user.userData && props.user.userData.cart) {
      if(props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        })
        dispatch(getCartItems(cartItems, props.user.userData.cart))
          .then(response => { calculateTotal(response.payload) })
      }
    }
  },[props.user.userData])

  const calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.map(item => {
      total += parseInt(item.price,10) * item.quantity
    })
    setTotal(total);
    setShowTotal(true)
  }

  let removeFromCart = (productId) => {
    dispatch(removeCartItem(productId))
      .then(response => {
        if(response.payload.productInfo.length <= 0){
          setShowTotal(false)
        }
      })
  }

  const paymentSuccess = (data) => {
    dispatch(onSuccessBuy({
      paymentData: data,
      cartDetail: props.user.cartDetail
    }))
    .then(response => {
      if(response.payload.success) {
        setShowTotal(false);
        setShowSuccess(true);
      }
    })
  }

  return (
    <div className="cartPage">
      <h1>My Cart</h1>
      
      <div>
        <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart} />
      </div>

      { 
        ShowTotal ? 
          <div className="totalCost">
            <h3>Total Amount (USD): ${Total}</h3>
          </div>
        : ShowSuccess ?
            <Result
              status="success"
              title="Successfully Purchased Items!"        
            />
          :
            <div className="noTotalCost">
              <Empty description={false} />
              <span>No Item in the Cart</span>
            </div>          
      }

      { 
        ShowTotal &&
          <div>
            <Paypal 
              totalPrice={Total} 
              onSuccess={paymentSuccess}  
            />
          </div>
      }
      
    </div>
  )
}

export default CartPage
