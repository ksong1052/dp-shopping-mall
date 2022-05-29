import React from 'react';

const UserCardBlock = ({ products, removeItem }) => {

  const rederCartImage = (images) => {
    if(images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`
    }
  }

  const renderItems = () => (
    /*
      {} 이걸 쓸때는  그 안에 return 을 써줘야 실제적으로 코드가 출력이 됩니다. 그리고 {} 안속에는 return 할 값이외에도 변수도 지정 가능
      하지만, () 를 쓸때는 위에와 같이 하지 못하고 그저 return 해줄 value만 넣어줄수 있습니다    
    */ 
    products && products.map((product, index) => (
      <tr key={index}>
        <td>
          <img 
            style={{ width: '70px'}}
            alt="product"
            src={rederCartImage(product.images)}
          />
        </td>
        <td> {product.quantity} EA </td>
        <td> ${product.price} </td>
        <td> 
          <button onClick={() => removeItem(product._id)}>
            Remove
          </button>
        </td>
      </tr>
    ))
  )

  return (
    <div className="userCardBlock">
      
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>
          { renderItems() }
        </tbody>
      </table>

    </div>
  )
}

export default UserCardBlock
