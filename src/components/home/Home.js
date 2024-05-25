import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../features/jobs/jobSlice";
import Loading from "../../ui/Loading";
import SingleJob from "../jobs/SingleJob";
import HomeNav from "./HomeNav";

const Home = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading, isError, error } = useSelector((state) => state.job);
  const { filterBy, search, sortBy } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // filters
  const filterByJob = (job) => {
    switch (filterBy) {
      case "All":
        return true;
      case "Internship":
        return job.type === "Internship";
      case "Full Time":
        return job.type === "Full Time";
      case "Remote":
        return job.type === "Remote";
      default:
        return true;
    }
  };

  const filterBySearch = (job) => {
    const targetJob = job.title.toLowerCase().includes(search);
    if (targetJob) {
      return true;
    }
  };

  const filterBySort = (a, b) => {
    switch (sortBy) {
      case "0":
        return true;
      case "1":
        return a.salary - b.salary;
      case "2":
        return b.salary - a.salary;
      default:
        return true;
    }
  };

  // decide what to render
  let content = null;
  if (isLoading) content = <Loading times={6} classname={""} />;

  if (!isLoading && isError)
    content = (
      <div className="text-gray-300">
        {error}
        {"!"}
      </div>
    );

  if (!isLoading && !isError && jobs?.length > 0) {
    content = jobs
      ?.filter(filterByJob)
      ?.filter(filterBySearch)
      ?.sort(filterBySort)
      ?.map((job, index) => <SingleJob key={index} job={job} />);
  }

  if (!isLoading && !isError && jobs?.length === 0) {
    content = <div className="text-gray-300">No jobs found!</div>;
  }
  return (
    <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 mb-10 xl:max-w-none bg-[#1E293B]">
      <HomeNav search={search} sortBy={sortBy} />
      <div className="jobs-list">
        {/* <!-- Single Job 1--> */}
        {content}
      </div>
    </main>
  );
};

export default Home;
