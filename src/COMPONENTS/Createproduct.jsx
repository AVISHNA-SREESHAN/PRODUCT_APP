import React, { useContext } from 'react';
import { sampleContext } from '../App';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';

const Createproduct = () => {
  const { Product, setProduct } = useContext(sampleContext);
  const nav = useNavigate();

  const handleCreateProduct = (newProduct) => {
    setProduct([...Product, newProduct]);
    nav('/table');
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <ProductForm onSubmit={handleCreateProduct} isEdit={false} />
    </div>
  );
};

export default Createproduct;
