import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Cart from './Components/Cart/Cart';
import Product from './Components/Product/Product';
import Products from './Components/Products/Products';
import './App.css';

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="product/:id" element={<Product />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
