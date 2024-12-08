import React, { useState, useEffect } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ProductForm = ({ initialData, onSubmit, isEdit }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.price || !formData.stock) {
      toast.error("All fields are required.");
      return;
    }

    onSubmit(formData);

    if (isEdit) {
      alert("Product edited successfully");
    } else {
      alert("Product submitted successfully");
    }
  };

  return (
    <div
      style={{
        border: '1px solid black',
        padding: '20px',
        borderRadius: '5px',
        maxWidth: '450px',
        width: '100%',
        backgroundColor: 'white',
        background: 'linear-gradient(135deg, #f9f9f9 50%, #e0e0e0 100%)',
      }}
    >
      <h1
        style={{
          fontFamily: 'cursive',
          textAlign: 'center',
          color: '#ff5c35',
        }}
      >
        {isEdit ? 'Edit Product' : 'Create Product'}
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: '20px', fontFamily: 'cursive' }}>Id</Form.Label>
          <Col sm="10">
            <Form.Control
              style={{ borderColor: 'black' }}
              type="number"
              name="id"
              value={formData.id || ''}
              onChange={handleInputChange}
              disabled={isEdit} 
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: '20px', fontFamily: 'cursive' }}>Title</Form.Label>
          <Col sm="10">
            <Form.Control
              style={{ borderColor: 'black' }}
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: '20px', fontFamily: 'cursive' }}>Category</Form.Label>
          <Col sm="10">
            <Form.Control
              style={{ borderColor: 'black' }}
              type="text"
              name="category"
              value={formData.category || ''}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: '20px', fontFamily: 'cursive' }}>Price</Form.Label>
          <Col sm="10">
            <Form.Control
              style={{ borderColor: 'black' }}
              type="number"
              name="price"
              value={formData.price || ''}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: '20px', fontFamily: 'cursive' }}>Stock</Form.Label>
          <Col sm="10">
            <Form.Control
              style={{ borderColor: 'black' }}
              type="number"
              name="stock"
              value={formData.stock || ''}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Button style={{ color: 'white', backgroundColor: '#ff5c35', border: 'none' }} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ProductForm;
