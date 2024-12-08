import React, { useContext, useState, useEffect } from 'react';
import { FaEye, FaEdit, FaShoppingCart } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Form, Modal, Table, Row, Col } from 'react-bootstrap';
import { sampleContext } from '../App';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Table.css';

const Tables = () => {
  const { Product, seteditData, setProduct } = useContext(sampleContext);
  const [show, setShow] = useState(false);
  const [id, setid] = useState([]);
  const [dltmsg, setdltmsg] = useState([]);
  const [shows, setShows] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(Product);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchs, setsearchs] = useState([]);

  const categories = [...new Set(Product.map((product) => product.category))];
  const nav = useNavigate();

  const handleClose = () => setShow(false);
  const handleCloses = () => setShows(false);

  const click = (id) => {
    setid(id);
    setShow(true);
  };

  const clicks = (id) => {
    nav('/edit');
    seteditData(id);
  };

  const clickss = (id) => {
    setdltmsg(id);
    setShows(true);
  };

  const handledlt = () => {
    const deleteproduct = Product.find((item) => item.id === dltmsg);
    if (deleteproduct) {
      const updatedProducts = Product.filter((item) => item.id !== dltmsg);
      setProduct(updatedProducts);
      setShows(false);
      setTimeout(() => {
        toast.error('Product deleted Successfully');
      }, 200);
    }
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setFilteredProducts(category ? Product.filter((product) => product.category === category) : Product);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    let sortedProducts = [...filteredProducts];
    if (sortOption === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  }, [sortOption, filteredProducts]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const getsearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setsearchs(searchValue);
    const filtersearch = Product.filter((product) =>
      product.title.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue) ||
      product.price.toString().includes(searchValue)
    );
    setFilteredProducts(filtersearch);
  };

  const submitSearch = (e) => e.preventDefault();

  const selectedProduct = filteredProducts.find(product => product.id === id);

  useEffect(() => {
    setFilteredProducts(Product);
  }, [Product]);

  return (
    <div>
      {/* Responsive Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <FaShoppingCart /> Product Management
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/Createproduct" style={{ textDecoration: 'none' }}>
                <Button variant="primary" className="me-2">
                  Create Product
                </Button>
              </Link>
              <Form onSubmit={submitSearch} className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={getsearch}
                  className="me-2"
                />
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Filters */}
      <Container className="my-3">
        <Row className="g-3">
          <Col xs={12} md={6}>
            <Form.Select
              aria-label="Filter by Category"
              onChange={(e) => filterByCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={6}>
            <Form.Select
              aria-label="Sort by Price"
              onChange={handleSortChange}
              value={sortOption}
            >
              <option value="">Sort by Price</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>

      {/* Responsive Table */}
      <Container>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>S/No</th>
                <th>IMAGE</th>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th colSpan="3">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((res, index) => (
                <tr key={res.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={res.thumbnail} alt="thumbnail" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  </td>
                  <td>{res.title}</td>
                  <td>{res.category}</td>
                  <td>$ {res.price}</td>
                  <td>{res.stock}</td>
                  <td><FaEye onClick={() => click(res.id)} className="text-success" /></td>
                  <td><FaEdit onClick={() => clicks(res.id)} className="text-primary" /></td>
                  <td><RiDeleteBin6Fill onClick={() => clickss(res.id)} className="text-danger" /></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

      {/* Pagination */}
      <Container className="d-flex justify-content-center my-3">
        <Button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          className="me-2"
        >
          Previous
        </Button>
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`me-1 ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
          className="ms-2"
        >
          Next
        </Button>
      </Container>

      {/* View Product Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          {selectedProduct ? (
            <>
              <h4>{selectedProduct.title}</h4>
              <img src={selectedProduct.thumbnail} alt="" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
              <p><b>Description:</b> {selectedProduct.description}</p>
              <p><b>Price:</b> $ {selectedProduct.price}</p>
              <p><b>Stock:</b> {selectedProduct.stock}</p>
              <p><b>Discount:</b> {selectedProduct.discountPercentage}%</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={shows} onHide={handleCloses} centered>
        <Modal.Body>
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handledlt}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleCloses}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Tables;
