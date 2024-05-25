import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../features/jobs/jobSlice";
import filterReducer from "../features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    job: jobReducer,
    filters: filterReducer,
  },
});
