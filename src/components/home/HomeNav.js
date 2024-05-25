import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onSearched, onSort } from "../../features/filter/filterSlice";

const HomeNav = ({ search, sortBy }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState(search);
  const [sort, setSort] = useState(sortBy);
  // search
  const handelSearch = (e) => {
    setSearchText(e.target.value);
  };
  // sort
  const handelSort = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    dispatch(onSort(sort));
    dispatch(onSearched(searchText));
  }, [searchText, dispatch, sort]);

  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
      <h1 className="lws-section-title">All Available Jobs</h1>
      <div className="flex gap-4">
        <div className="search-field group flex-1">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Job"
            className="search-input"
            value={searchText}
            id="lws-searchJob"
            onChange={handelSearch}
          />
        </div>
        <select
          id="lws-sort"
          value={sort}
          name="sort"
          autoComplete="sort"
          className="flex-1"
          onChange={handelSort}
        >
          <option value="0">Default</option>
          <option value="1">Salary (Low to High)</option>
          <option value="2">Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default HomeNav;
