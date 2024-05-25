import { useDispatch } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { editActive, removeJob } from "../../features/jobs/jobSlice";

const SingleJob = ({ job }) => {
  const { id, title, type, salary, deadline } = job || {};
  const dispatch = useDispatch();

  // match current path and redirect
  const match = useMatch("/editjob");
  const navigate = useNavigate();

  const handleEdit = () => {
    dispatch(editActive(job));
    if (!match) {
      navigate("/editjob");
    }
  };

  const handleDelete = () => {
    dispatch(removeJob(id));
  };

  return (
    <div className="lws-single-job">
      <div className="flex-1 min-w-0">
        <h2 className="lws-title">{title}</h2>
        <div className="job-footers">
          <div className="lws-type">
            {/* <!-- Fulltime Internship Remote --> */}
            {type === "Full Time" ? (
              <i className="fa-solid fa-stop !text-[#FF8A00] text-lg mr-1.5"></i>
            ) : null}
            {type === "Internship" ? (
              <i className="fa-solid fa-stop !text-[#FF5757] text-lg mr-1.5"></i>
            ) : null}
            {type === "Remote" ? (
              <i className="fa-solid fa-stop !text-[#56E5C4] text-lg mr-1.5"></i>
            ) : null}
            {type}
          </div>
          <div className="lws-salary">
            <i className="fa-solid fa-bangladeshi-taka-sign text-slate-400 text-lg mr-1.5"></i>
            BDT {salary}
          </div>
          <div className="lws-deadline">
            <i className="fa-regular fa-calendar text-slate-400 text-lg mr-1.5"></i>
            Closing on {deadline}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="">
          <button
            type="button"
            className="lws-edit btn btn-primary"
            onClick={handleEdit}
          >
            <i className="fa-solid fa-pen text-gray-300 -ml-1 mr-2"></i>
            Edit
          </button>
        </span>

        <span className="ml-3">
          <button
            type="button"
            className="lws-delete btn btn-danger"
            onClick={handleDelete}
          >
            <i className="fa-solid fa-trash text-gray-300 -ml-1 mr-2"></i>
            Delete
          </button>
        </span>
      </div>
    </div>
  );
};

export default SingleJob;
