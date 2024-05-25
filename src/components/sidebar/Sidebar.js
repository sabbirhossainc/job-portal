import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { filterSelected } from "../../features/filter/filterSlice";

const Sidebar = () => {
  const { filterBy } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  // / match current path and redirect
  const match = useMatch("/");
  const navigate = useNavigate();

  const [selected, setSelected] = useState(filterBy);

  const handelSelect = (val) => {
    setSelected(val);
    if (!match) {
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(filterSelected(selected));
  }, [selected, dispatch]);

  return (
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <li>
            <button
              className="main-menu menu-active"
              id="lws-alljobs-menu"
              onClick={() => handelSelect("All")}
            >
              <i className="fa-solid fa-briefcase"></i>
              <span> All Available Jobs</span>
            </button>
            <ul className="space-y-6 lg:space-y-2 ">
              <li>
                <button
                  className="sub-menu"
                  id="lws-internship-menu"
                  onClick={() => handelSelect("Internship")}
                >
                  <i className="fa-solid fa-stop !text-[#FF5757]"></i>{" "}
                  Internship
                </button>
              </li>
              <li>
                <button
                  className="sub-menu"
                  id="lws-fulltime-menu"
                  onClick={() => handelSelect("Full Time")}
                >
                  <i className="fa-solid fa-stop !text-[#FF8A00]"></i> Full Time
                </button>
              </li>
              <li>
                <button
                  className="sub-menu"
                  id="lws-remote-menu"
                  onClick={() => handelSelect("Remote")}
                >
                  <i className="fa-solid fa-stop !text-[#56E5C4]"></i> Remote
                </button>
              </li>
            </ul>
          </li>
          <li>
            <Link to={"/addjob"} className="main-menu" id="lws-addJob-menu">
              <i className="fa-solid fa-file-circle-plus"></i>
              <span>Add NewJob</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
