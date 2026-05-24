import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  console.log(images, "ffff", previews);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImage = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    setImages((prev) => [...prev, filesArray]);

    const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
    // setPreviews((prev) => [...prev, ...previewUrls]);
    setImages((prev) => [...prev, ...filesArray]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));

    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      return alert("At least one image required");
    }
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    // formData.append("image", image);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await API.post("/products", formData);
      alert(res.data.message);

      setForm({
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

      setImages([]);
      setPreviews([]);
      navigate("/products");
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
           {images.length < 5 ? (
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImage}
            />
          ): "Maximum 5 images add You are alredy add"}

          {/* {previews.length > 0 && (
            <div className="preview-container">
              {previews.map((img, index) => (
                <div className="preview" key={index}>
                  <img src={img} alt="preview" />
                </div>
              ))}
            </div>
          )} */}
          {previews.length > 0 && (
            <div className="preview-container">
              {previews.map((img, index) => (
                <div className="preview" key={index}>
                  <img src={img} alt="preview" />

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeImage(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
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

  .preview-container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 15px;
  }

  .preview {
    position: relative;
  }

  .preview img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  .remove-btn {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 50%;
    background: red;
    color: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  }
`;
