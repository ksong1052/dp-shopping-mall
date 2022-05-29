import './landingPage.scss';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { RocketOutlined } from '@ant-design/icons';
import ImageSlider from '../../utils/ImageSlider';
import CheckBoxForContinents from './Sections/CheckBoxForContinents';
import RadioboxForPrice from './Sections/RadioboxForPrice';
import SearchFeature from './Sections/SearchFeature';
import { continents, priceRange } from './Sections/Data';

const LandingPage = () => {
  const navigate = useNavigate(); 
  const [products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    continents: [],
    price: []
  });
  const [SearchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    let body = {
      skip : Skip,
      limit : Limit
    }

    getProducts(body);    
  },[])

  const getProducts = (body) => {
    axios.post('/api/products/allproducts', body)
      .then(response => {
        if(response.data.success) {
          // console.log(response.data);
          if(body.loadMore) {
            setProducts([...products, ...response.data.productInfo])
          } else {
            setProducts(response.data.productInfo);
          }
          setPostSize(response.data.postSize);
        } else {
          alert('상품을 가져오는데 실패 했습니다.');
        }
      })
  }

  /* Loading Images More */ 
  const loadmoreHandler = () => {
    let skipMore = Skip + Limit;
    let body = {
      skip : skipMore,
      limit : Limit,
      loadMore: true
    }

    getProducts(body);
    setSkip(skipMore);
  }

  /* Antd 카드 설정 */ 
  const renderCards = products.map((product, index) => {
    // console.log(product);

    return <Col lg={6} md={8} xs={24} key={index}>
      {/* <Card         
        cover={<img style={{ width: '100%', maxHeight: '150px' }}  src={`http://localhost:5000/${product.images[0]}`} />}    
        > */}
      <Card        
        cover={ 
          <a href={`/product/${product._id}`}>
            <ImageSlider images={product.images} /> 
          </a>
        }
      >
        <Meta 
          title={product.title}
          description={`$${product.price}`}
        />
      </Card>     
    </Col>
  });

  const showFilterResults = (filters) => {
    let body = {
      skip : 0,
      limit : Limit,
      filters: filters
    }

    getProducts(body);
    setSkip(0);
  }

  const handlePrice = (value) =>{
    const data = priceRange;
    let array = [];

    for (const key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;        
      }
    }
    return array;
  }

  // 값들의 ID가 filters에 저장.  
  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    // console.log({filters});

    if(category === 'price') {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;

    }

    showFilterResults(newFilters);
    setFilters(newFilters);
  }

  const updateSearchTerm = (newSearchTerm) => {    
    let body = {
      skip : Skip,
      limit : Limit,
      filters: Filters,
      searchTerm: newSearchTerm
    }
    
    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  }

  return (
    <div className="landingPage">
      <div className="landTitle">
        <h2>Let's Travel Anywhere <RocketOutlined /></h2>         
      </div>

      {/* Filter */}
      <Row gutter={[16,16]}>
        <Col lg={12} xs={24}>
          {/* Checkbox */}
          <CheckBoxForContinents list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
        </Col>
        <Col lg={12} xs={24}>
          {/* Radiobox */}
          <RadioboxForPrice list={priceRange} handleFilters={filters => handleFilters(filters, "price")} />          
        </Col>
      </Row> 

      {/* Search */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
        <SearchFeature 
          updateSearchTerm={updateSearchTerm}
        />
      </div>
      {/* 
        - Cards -
        gutter : card 간격  
      */}
      <Row gutter={[16,16]}>
        { renderCards }     
      </Row>

      <br />

      {/* 보여져야 할 이미지 숫자가 limit보다 적으면 More버튼을 숨긴다. */}
      {
        PostSize >= Limit && 
          <div className="landMore">
            <button onClick={loadmoreHandler}>More</button>
          </div>
      }
      
    </div>
  )
}

export default LandingPage;

