import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/Productslice";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!product.name || isNaN(product.price) || parseFloat(product.price) <= 0) {
      alert("Vui lòng nhập tên hàng hóa và giá hợp lệ.");
      return;
    }

    
    const newProduct = {
      id: Date.now(), 
      name: product.name,
      price: parseFloat(product.price), 
    };

    
    dispatch(addProduct(newProduct));

    navigate("/products");
  };

  return (
    <div className="form-container">
      <h2>Thêm Hàng Hóa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tên hàng hóa"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Giá hàng hóa"
          value={product.price}
          onChange={handleChange}
          required
          min="0" 
        />
        <button type="submit">Thêm hàng hóa</button>
      </form>
      <button className="back-btn" onClick={() => navigate("/products")}>
        Quay Lại
      </button>
    </div>
  );
};

export default AddProductForm;
