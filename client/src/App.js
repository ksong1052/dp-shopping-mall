import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from './components/views/NavBar/NavBar';
import LandingPage from './components/views/LandingPage/LandingPage';
import Login from './components/views/Login/Login';
import Register from './components/views/Register/Register';
import Footer from './components/views/Footer/Footer';
import Auth from './hoc/auth';
import UploadProductPage from './components/views/UploadProductPage/UploadProductPage';
import DetailProductPage from './components/views/DetailProductPage/DetailProductPage';
import CartPage from './components/views/CartPage/CartPage';
import HistoryPage from './components/views/HistoryPage/HistoryPage';

function App() {
  return (
    <div>      
      <Suspense fallback={(<div>Loading...</div>)}>       
        <Router>

        <NavBar />

          <Routes>        
            {/* <Route exact path="/" element={<LandingPage />} />        */}
            <Route exact path="/" element={Auth(LandingPage, null)} />  
            
            {/* <Route exact path="/login"
              render={() =>
                cUser ? (
                  <Redirect to='/' />
                ) : (
                  <Login />
                )
              }
            /> */}
            {/* <Route exact path="/register"
              render={() =>
                cUser ? (
                  <Redirect to='/' />
                ) : (
                  <Register />
                )
              }
            /> */}
            {/* <Route exact path="/login" element={<Login />} /> */}
            <Route exact path="/login" element={Auth(Login, false)} />

            {/* 하위 path에 connecting 시키기 위해서는 exact를 붙여 주면 안 된다.
                예를 들어, /shop/:id   or   /shop/hats/:id
            */}
            {/* <Route path="/shop" component={ShopPage} /> */}
            {/* <Route exact path="/register" element={<Register />} /> */}
            <Route exact path="/register" element={Auth(Register, false)} />
            <Route exact path="/products/upload" element={Auth(UploadProductPage, true)} />
            <Route exact path="/product/:productId" element={Auth(DetailProductPage, true)} />
            <Route exact path="/users/cart" element={Auth(CartPage, true)} />
            <Route exact path="/history" element={Auth(HistoryPage, true)} />

            {/* <Route path="*" component={NotFound}/> */}
          </Routes>

        <Footer /> 

        </Router>        
      </Suspense>      
    </div>
  );
}

export default App;
