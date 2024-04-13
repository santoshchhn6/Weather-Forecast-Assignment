import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

const Layout = () => {
  return (
    <div className="bg-slate-400">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
