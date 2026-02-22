import { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { useProductContext } from "../../context/ProductContext";
import PageNavigation from "../../components/common/PageNavigation";
import MyImage from "../../components/common/MyImage";
import { Container } from "../../styles/Container";
import FormatPrice from "../../Helpers/FormatPrice";
import Star from "../../components/common/Star";
import AddToCart from "../../components/cart/AddToCart";

// const API = "https://api.pujakaitem.com/api/products";
const products = [
  {
    id: "1",
    featured: true,
    name: "Premium Cotton Shirt",
    company: "Roadster",
    price: 1499,
    description: "Soft cotton shirt, perfect for daily wear",
    stock: 25,
    stars: 4.5,
    reviews: 128,
    image: [
      { url: "https://picsum.photos/500/500?random=11" },
      { url: "https://picsum.photos/500/500?random=12" },
    ],
  },
  {
    id: "2",
    featured: true,
    name: "Wireless Headphones",
    company: "Boat",
    price: 2999,
    description: "Noise cancellation with deep bass",
    stock: 15,
    stars: 4.3,
    reviews: 89,
    image: [{ url: "https://picsum.photos/500/500?random=21" }],
  },
  {
    id: "3",
    featured: false,
    name: "Running Shoes",
    company: "Nike",
    price: 2499,
    description: "Lightweight running shoes for daily workouts",
    stock: 18,
    stars: 4.6,
    reviews: 210,
    image: [{ url: "https://picsum.photos/500/500?random=31" }],
  },
  {
    id: "4",
    featured: true,
    name: "Smart Watch",
    company: "Noise",
    price: 1999,
    description: "Fitness tracking smart watch with heart monitor",
    stock: 30,
    stars: 4.2,
    reviews: 164,
    image: [{ url: "https://picsum.photos/500/500?random=41" }],
  },
  {
    id: "5",
    featured: false,
    name: "Bluetooth Speaker",
    company: "JBL",
    price: 3499,
    description: "Portable speaker with powerful bass",
    stock: 12,
    stars: 4.7,
    reviews: 276,
    image: [{ url: "https://picsum.photos/500/500?random=51" }],
  },
  {
    id: "6",
    featured: false,
    name: "Laptop Backpack",
    company: "American Tourister",
    price: 1599,
    description: "Water-resistant backpack with laptop compartment",
    stock: 22,
    stars: 4.4,
    reviews: 143,
    image: [{ url: "https://picsum.photos/500/500?random=61" }],
  },
  {
    id: "7",
    featured: true,
    name: "Gaming Mouse",
    company: "Logitech",
    price: 1299,
    description: "High-precision gaming mouse with RGB lights",
    stock: 35,
    stars: 4.5,
    reviews: 312,
    image: [{ url: "https://picsum.photos/500/500?random=71" }],
  },
  {
    id: "8",
    featured: false,
    name: "LED Desk Lamp",
    company: "Philips",
    price: 1199,
    description: "Eye-care LED desk lamp with adjustable brightness",
    stock: 26,
    stars: 4.3,
    reviews: 156,
    image: [{ url: "https://picsum.photos/500/500?random=81" }],
  },
];

// ... (previous imports)

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();
  console.log("singleProduct", singleProduct);
  const { id } = useParams();

  const { name, company, price, description, stock, stars, reviews, images } =
    singleProduct;

  //   useEffect(() => {
  //     getSingleProduct(`${API}?id=${id}`);
  //   }, [id, getSingleProduct]);

  console.log("products", products);
  useEffect(() => {
    if (!singleProduct || singleProduct.id !== id) {
      // If not, make the API call
      // getSingleProduct(`${API}?id=${id}`);
      const product = products.find((p) => p.id === id);
      if (product) {
        getSingleProduct(product);
      }
    }
  }, [getSingleProduct, id, singleProduct]);

  if (isSingleLoading) {
    return <div className="page_loading">Loading.....</div>;
  }

  return (
    <Wrapper>
      <PageNavigation title={name} />
      <Container className="container">
        <div className="grid grid-two-column">
          {/* product Images  */}
          <div className="product_images">
            <MyImage imgs={images} />
          </div>

          {/* product dAta  */}
          <div className="product-data">
            <h2>{name}</h2>
            <Star stars={stars} reviews={reviews} />

            <p className="product-data-price">
              MRP:
              <del>
                <FormatPrice price={price + 250000} />
              </del>
            </p>
            <p className="product-data-price product-data-real-price">
              Deal of the Day: <FormatPrice price={price} />
            </p>
            <p>{description}</p>
            <div className="product-data-warranty">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p>30 Days Replacement</p>
              </div>

              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Thapa Delivered </p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity className="warranty-icon" />
                <p>2 Year Warranty </p>
              </div>
            </div>

            <div className="product-data-info">
              <p>
                Available:
                <span> {stock > 0 ? "In Stock" : "Not Available"}</span>
              </p>
              <p>
                ID : <span> {id} </span>
              </p>
              <p>
                Brand :<span> {company} </span>
              </p>
            </div>
            <hr />
            {stock > 0 && <AddToCart product={singleProduct} />}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;
