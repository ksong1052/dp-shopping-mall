import React from 'react';
import { Carousel } from 'antd';

const ImageSlider = ({ images }) => {
//   console.log({images});

  return (
    <div>
        <Carousel autoplay>
            {
                images.map((image, index) => (
                    // console.log({image});
                    <div key={index}>
                        <img 
                            style={{ width: '100%', maxHeight: '1800px' }}  
                            src={`http://localhost:5000/${image}`} 
                        />
                    </div>
                ))
            }
        </Carousel>
    </div>
  )
}

export default ImageSlider
