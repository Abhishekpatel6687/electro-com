
import FeatureProduct from "../products/FeatureProduct";
import Services from "../../components/product/ServiceSection";
import Trusted from "../../components/common/Trusted";
import HeroSection from "../../components/product/HeroSection";
import Header from "../../components/layout/Header";
const Home = () => {
  const data = {
    name: "Patel Store",
  };

  return (
    <>
    {/* <Header/> */}
      <HeroSection myData={data} />
      <FeatureProduct/>
      <Services />
      <Trusted />

    </>
  );
};
export default Home;
