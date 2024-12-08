import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Createproduct from './COMPONENTS/Createproduct';
import Tables from './COMPONENTS/Tables';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Edit from './COMPONENTS/Edit';
import ProductForm from './COMPONENTS/ProductForm';
import 'react-toastify/dist/ReactToastify.css';

const sampleContext = createContext();

function App() {
  const [Product, setProduct] = useState([]);
  const [editData, seteditData] = useState("");

  const Products = "https://dummyjson.com/products";

  useEffect(() => {
    axios.get(Products).then((res) => setProduct(res.data.products));
  }, [setProduct]);

  return (
    <div>
      <sampleContext.Provider value={{ Product, setProduct, Products, editData, seteditData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Tables />} />  
            
            <Route path="/table" element={<Tables />} />
            
            <Route path="/createproduct" element={<ProductForm />} />
            
            <Route path="/edit/:id" element={<ProductForm />} /> 
          </Routes>
        </BrowserRouter>
      </sampleContext.Provider>
    </div>
  );
}

export default App;
export { sampleContext };
