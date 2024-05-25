const { createSlice } = require("@reduxjs/toolkit");

// initial state
const initialState = {
  filterBy: "All",
  search: "",
  sortBy: "",
};

// The slice
const filterSlice = createSlice({
  name: "filterJob",
  initialState,
  reducers: {
    filterSelected: (state, action) => {
      state.filterBy = action.payload;
    },
    onSearched: (state, action) => {
      state.search = action.payload;
    },
    onSort: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const {filterSelected,onSearched,onSort} = filterSlice.actions