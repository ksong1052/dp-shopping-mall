import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;

const RadioboxForPrice = ({ list, handleFilters }) => {
  const [Value, setValue] = useState(1);

  const handleChange = (e) => {
    setValue(e.target.value);
    handleFilters(e.target.value);
  }

  const renderRadioLists = () => list && list.map((value, index) => (
    <React.Fragment key={index}>
      <Radio 
        style={{marginRight: '5px'}}
        key={value._id}
        value={value._id}        
      >
        <span
          style={{marginLeft: '5px', marginRight: '10px'}}
        >
          {value.name}
        </span>
      </Radio>   
    </React.Fragment>
  ));

  return (
    <div className="RadioForPrice">
      <Collapse defaultActiveKey={['0']} >
        <Panel header="Price" key="1">
          <Radio.Group onChange={handleChange} value={Value}>
            {renderRadioLists()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  )
}

export default RadioboxForPrice
