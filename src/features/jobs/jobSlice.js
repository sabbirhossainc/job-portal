import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getJobs, addJob, editJob, deleteJob } from "./jobsAPI";

const initialState = {
  jobs: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};

// async thunks
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const jobs = await getJobs();
  return jobs;
});

export const createJob = createAsyncThunk("jobs/createJob", async (data) => {
  const jobs = await addJob(data);
  return jobs;
});

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({id, data}) => {
    const jobs = await editJob(id, data);
    return jobs;
  }
);

export const removeJob = createAsyncThunk("jobs/removeJob", async (id) => {
  const jobs = await deleteJob(id);
  return jobs;
});

// create slice

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.jobs = [];
      })
      .addCase(createJob.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = action.payload;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(updateJob.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        // find the job index to be update
        const indexToUpdate = state.jobs.findIndex(
          (j) => j.id === action.payload.id
        );
        state.jobs[indexToUpdate] = action.payload;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(removeJob.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        // filtering the delete job from jobs
        state.jobs = state.jobs.filter((j) => j.id !== action.meta.arg);
      })
      .addCase(removeJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default jobSlice.reducer;
export const { editActive, editInActive } = jobSlice.actions;
