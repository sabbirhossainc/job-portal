import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

export const Layout = ({ children }) => {
  return (
    <div className="App">
      <Navbar />
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 ">
        <Sidebar />
        <div className="lg:pl-[14rem]  mt-[5.8125rem]">{children}</div>
      </div>
    </div>
  );
};
