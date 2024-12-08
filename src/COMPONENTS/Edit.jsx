import React, { useContext } from 'react';
import { sampleContext } from '../App';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';

const Edit = () => {
  const { Product, editData, setProduct } = useContext(sampleContext);
  const nav = useNavigate();

  const productToEdit = Product.find((item) => item.id === editData);

  const handleEditProduct = (updatedProduct) => {
    const updatedProducts = Product.map((item) =>
      item.id === editData ? { ...item, ...updatedProduct } : item
    );
    setProduct(updatedProducts);
    nav('/table');
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <ProductForm initialData={productToEdit} onSubmit={handleEditProduct} isEdit={true} />
    </div>
  );
};

export default Edit;
