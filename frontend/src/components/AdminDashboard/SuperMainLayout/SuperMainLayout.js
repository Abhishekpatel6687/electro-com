import { Outlet } from "react-router-dom";
import Header from "../../layout/Header";

export default function SuperMainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}