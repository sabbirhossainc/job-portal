const Loading = ({ times, classname }) => {
  return (
    <div className={classname}>
      {/* <!-- Loading Card  --> */}
      <div className="lws-single-job hr">
        <div className="flex-1 min-w-0">
          <h2 className="lws-title">Free server!!! 🥲</h2>
          <div className="jobinfo">
            <p className="lws-salary">
              Please wait... less than 60s for start server or reload untill it
              start. Thank you!
            </p>
          </div>
        </div>
      </div>
      {Array.from({ length: times }).map((_, index) => (
        <div className="lws-single-job hr" key={index}>
          <div className="flex-1 min-w-0">
            <h2 className="lws-title">
              <div className="skeleton skeleton-text skeleton-footer"></div>
            </h2>
            <div className="jobinfo">
              <div className="skeleton skeleton-text skeleton-feature"></div>

              <div className="skeleton skeleton-text skeleton-feature"></div>

              <div className="skeleton skeleton-text skeleton-feature"></div>
            </div>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <div className="skeleton skeleton-text skeleton-feature loading-btn"></div>

            <div className="skeleton skeleton-text skeleton-feature loading-btn ml-3"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </div>
  );
};

export default Loading;
