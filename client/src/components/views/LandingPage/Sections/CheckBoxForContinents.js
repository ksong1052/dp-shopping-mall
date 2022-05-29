import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

const CheckBoxForContinents = ({ list, handleFilters }) => {
  // console.log({list});

  // 1. 
  // const onCheckboxHandler = (e) => {
  //   console.log(`checked = ${e.target.checked}`);
  // };

  // return (
  //   <div className="CheckBoxForContinents">
  //     <Collapse defaultActiveKey={['1']} >
  //       <Panel header="This is panel header 1" key="1">
  //         {
  //           list.map((item, index) => (
  //             <Checkbox key={index} onChange={onCheckboxHandler}>{item.name}</Checkbox>
  //           ))
  //         }
  //       </Panel>
  //     </Collapse>
  //   </div>
  // )

  // 2. 
  // Checked된 모든 대륙 정보를 넣는 것
  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    // 누른 것의 index를 구하고
    const currentIndex = Checked.indexOf(value);

    // Checked값이 -1이면 누른 값이 Checked에 없다는 의미
    // 전체 Checked된 state에서 현재 누른 Checked가 이미 있다면 
    const newChecked = [...Checked]
    if(currentIndex === -1) {
      // state를 넣어 준다.
      newChecked.push(value);
    } else {
      // 빼주고 
      newChecked.splice(currentIndex, 1);
    }    

    setChecked(newChecked);
    
    // console.log({Checked});

    handleFilters(newChecked);
  }

  const renderCheckboxLists = () => list && list.map((value, index) => (
    <React.Fragment key={index}>
      <Checkbox 
        style={{marginRight: '5px'}}
        onChange={() => handleToggle(value._id)} 
        checked={Checked.indexOf(value._id) === -1 ? false : true} />
      <span
        style={{marginLeft: '3px', marginRight: '5px'}}
      >
        {value.name}
      </span>      
    </React.Fragment>
  ));

  return (
    <div className="CheckBoxForContinents">
      <Collapse defaultActiveKey={['0']} >
        <Panel header="Continent" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  )
}

export default CheckBoxForContinents
