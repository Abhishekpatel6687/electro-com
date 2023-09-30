
import FeatureProduct from "./FeatureProduct";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";
const Home = () => {
  const data = {
    name: "Abhi Store",
  };

  return (
    <>
      <HeroSection myData={data} />
      <FeatureProduct/>
      <Services />
      <Trusted />
    </>
  );
};
export default Home;
