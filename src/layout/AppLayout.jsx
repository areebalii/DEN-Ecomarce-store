import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export const AppLayout = () => {
  return (
    <div className="app-layout">
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
