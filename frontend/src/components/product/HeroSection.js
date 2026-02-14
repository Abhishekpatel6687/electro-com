import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../styles/Button";

const HeroSection = ({ myData }) => {
  const { name } = myData;

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-data">
            <p className="intro-data">Welcome to </p>
            <h1>{name}</h1>
            <p>
              Patel Offers an Array Of Unique Products From many Brands. Prime
              Members Can Enjoy Unlimited Free Shipping, Early Access To
              Lightning Deals and More. No Cost EMI Available. Great Offers. Top
              Brands. Best Deals. Low Prices. Huge Selection.
            </p>
            <NavLink to="/products">
              <Button>Shop now</Button>
            </NavLink>
          </div>
          {/* our homepage images */}
          <div className="hero-section-image">
            <figure>
              <img
                src="images/hero.jpg"
                className="img-style"
                alt="hero section"
              />
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 12rem 0;

  img {
    min-width: 10rem;
    height: 10rem;
  }

  .hero-section-data {
    p {
      margin: 2rem 0;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
      color: #161554;
    }

    .intro-data {
      margin-bottom: 0;
      color: #2d2cad;
      font-size: 18px;
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;
export default HeroSection;
