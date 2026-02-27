import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../../Helpers/FormatPrice";

const Product = (curElem) => {
  const { id, name, images, price, category } = curElem;
  return (
    <div>
      <NavLink to={`/singleproduct/${id}`}>
        <div className="card">
          <figure>
            {images && images.length > 0 && (
              <img
                src={`http://localhost:8080${images[0]?.url}`} // 👈 correct
                alt={name}
              />
            )}
            <figcaption className="caption">{category}</figcaption>
          </figure>

          <div className="card-data">
            <div className="card-data-flex">
              <h3>{name}</h3>
              <p className="card-data--price">
                {<FormatPrice price={price} />}
              </p>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Product;
