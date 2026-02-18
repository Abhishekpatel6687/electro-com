import React, { useState } from "react";
import styled from "styled-components";
import API from "../../../services/api";

const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    price: "",
    description: "",
    stock: "",
    stars: "",
    reviews: "",
    featured: false,
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert("Image required");

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    formData.append("image", image);

    try {
      const res = await API.post("/products", formData);

      alert(res.data.message);

    //   setForm({
    //     name: "",
    //     company: "",
    //     price: "",
    //     description: "",
    //     stock: "",
    //     stars: "",
    //     reviews: "",
    //     featured: false,
    //     category: "",
    //   });

    //   setImage(null);
    //   setPreview(null);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <Wrapper>
      <div className="card">
        <h2>Add New Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
            />

            <input
              type="number"
              step="0.1"
              name="stars"
              placeholder="Stars (0-5)"
              value={form.stars}
              onChange={handleChange}
            />

            <input
              type="number"
              name="reviews"
              placeholder="Reviews Count"
              value={form.reviews}
              onChange={handleChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
          />

          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />
              Featured Product
            </label>
          </div>

          <input type="file" accept="image/*" onChange={handleImage} />

          {preview && (
            <div className="preview">
              <img src={preview} alt="preview" />
            </div>
          )}

          <button type="submit">Add Product</button>
        </form>
      </div>
    </Wrapper>
  );
};

export default ProductForm;
const Wrapper = styled.div`
  min-height: 100vh;
  background: #f4f6f9;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;

  .card {
    background: #fff;
    padding: 40px;
    width: 800px;
    border-radius: 20px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  }

  h2 {
    text-align: center;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  input,
  textarea {
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #ddd;
    font-size: 14px;
  }

  textarea {
    min-height: 100px;
    resize: none;
  }

  .checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  button {
    padding: 14px;
    border-radius: 10px;
    border: none;
    background: #4e73df;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
  }

  button:hover {
    background: #224abe;
  }

  .preview {
    text-align: center;
  }

  .preview img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 15px;
    border: 1px solid #ddd;
  }
`;
