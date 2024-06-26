import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
const Navbar = () => {
  return (
    <div>
      <nav className="max-w-[90rem] mx-auto py-4 fixed top-0 w-full left-1/2 -translate-x-1/2 px-4 md:px-0">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={200} height={30} />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
