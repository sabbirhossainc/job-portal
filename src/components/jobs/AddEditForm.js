import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createJob,
  editInActive,
  updateJob,
} from "../../features/jobs/jobSlice";
import { useMatch, useNavigate } from "react-router-dom";

const AddEditForm = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, isError, error } = useSelector((state) => state.job);
  const { editing } = useSelector((state) => state.job) || {};

  // match current path and redirect
  const match = useMatch("/");
  // const matchEditPage = useMatch("/editjob");
  const navigate = useNavigate();

  // reseting the form
  const resetForm = () => {
    setTitle("");
    setType("");
    setSalary("");
    setDeadline("");
  };

  // handle add job
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(
      createJob({
        title,
        type,
        salary: Number(salary),
        deadline,
      })
    );
    resetForm();

    if (!match) {
      navigate("/");
    }
  };

  // handle add job
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateJob({
        id: editing?.id,
        data: {
          title,
          type,
          salary: Number(salary),
          deadline,
        },
      })
    );
    setEditMode(false);
    dispatch(editInActive());

    if (!match) {
      navigate("/");
    }
  };

  // handle back

  const handleCancel = () => {
    if (!match) {
      navigate("/");
    }
    if (editMode) {
      dispatch(editInActive());
    }
  };

  // listen For edit mode active
  useEffect(() => {
    const { id, title, type, salary, deadline } = editing || {};
    if (id) {
      setEditMode(true);
      setTitle(title);
      setType(type);
      setSalary(salary);
      setDeadline(deadline);
    } else {
      setEditMode(false);
      resetForm();
    }

    // const doThis = () => {
    //   if (matchEditPage) {
    //     dispatch(editInActive());
    //     navigate("/");
    //   }
    // };
    //  const handleBeforeUnload = (event) => {
    //   event.preventDefault();
    //   if (editMode) {
    //     if (!match) {
    //       dispatch(editInActive());
    //       return <Navigate to="/" replace />;
    //     }
    //   }
    // };
    // window.addEventListener('beforeunload', handleBeforeUnload);
    // return () => {
    //   window.removeEventListener('beforeunload', handleBeforeUnload);
    // };
  }, [editing, editMode, match, navigate, dispatch]);

  return (
    <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
      <h1 className="mb-10 text-center lws-section-title">
        {editMode ? "Edit Job" : "Add New Job"}
      </h1>

      <div className="max-w-3xl mx-auto">
        <form
          className="space-y-6"
          onSubmit={editMode ? handleUpdate : handleAdd}
        >
          <div className="fieldContainer">
            <label
              htmlFor="lws-JobTitle"
              className="text-sm font-medium text-slate-300"
            >
              Job Title
            </label>
            <select
              name="lwsJobTitle"
              value={title}
              id="lws-JobTitle"
              onChange={(e) => setTitle(e.target.value)}
              required
            >
              <option defaultValue={""} hidden>
                Select Job
              </option>
              <option>Software Engineer</option>
              <option>Software Developer</option>
              <option>Full Stack Developer</option>
              <option>MERN Stack Developer</option>
              <option>DevOps Engineer</option>
              <option>QA Engineer</option>
              <option>Product Manager</option>
              <option>Social Media Manager</option>
              <option>Senior Executive</option>
              <option>Junior Executive</option>
              <option>Android App Developer</option>
              <option>IOS App Developer</option>
              <option>Frontend Developer</option>
              <option>Frontend Engineer</option>
            </select>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobType">Job Type</label>
            <select
              name="lwsJobType"
              id="lws-JobType"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option defaultValue={""} hidden>
                Select Job Type
              </option>
              <option>Full Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobSalary">Salary</label>
            <div className="flex border rounded-md shadow-sm border-slate-600">
              <span className="input-tag">BDT</span>
              <input
                className="!rounded-l-none !border-0"
                type="number"
                name="lwsJobSalary"
                placeholder="20,00,000"
                value={salary}
                id="lws-JobSalary"
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobDeadline">Deadline</label>
            <input
              type="date"
              name="lwsJobDeadline"
              value={deadline}
              id="lws-JobDeadline"
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className="flex text-right gap-4">
            <button
              type="submit"
              id="lws-submit"
              className="cursor-pointer btn btn-primary w-fit"
            >
              {editMode ? "Edit" : "Submit"}
            </button>
            <button
              type="submit"
              id="lws-submit"
              className="cursor-pointer btn btn-primary w-fit"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
        {!isLoading && isError && <p className="">{error}</p>}
      </div>
    </main>
  );
};

export default AddEditForm;
