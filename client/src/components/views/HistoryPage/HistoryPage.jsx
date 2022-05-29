import React from 'react';
import './historyPage.scss';
import { useSelector } from "react-redux";

const HistoryPage = (props) => {
  // const user = useSelector(state => state.user);

  // 숫자로만 나와 있던 날짜값을 yyyy/mm/dd 포맷으로 변경
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return [      
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('/');
  }

  const totalQ = 0;

  return (
    <div className="historyPage">
      <div className="historyPageTitle">
        <h1>Purchase History</h1>
      </div>

      <br />

      <div className="historyTable">
        <table>
          <thead>
            <tr>
              <th>Payment Id</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date of Purchase</th>
            </tr>
          </thead>
          <tbody>
            {               
              props.user.userData && props.user.userData.history &&
              props.user.userData.history.map((items, idx) => (        
                <tr key={idx}>
                  <td>{items[0].id}</td>
                  <td>{items[0].price}</td> 
                  <td>
                    {
                      items[0].quantity
                    }
                  </td>
                  <td>
                    {
                      formatDate(new Date(items[0].dateOfPurchase))                      
                    }
                  </td>                            
                </tr>
              ))
            }            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HistoryPage
