function ErrorNotice() {
  return (
    <div
      className="position-fixed top-50 w-100 text-center"
      style={{ width: "100vw" }}
    >
      <p>
        Data not found.{" "}
        <span>
          <a href="#" onClick={() => history.go(-1)}>
            Go Back
          </a>
        </span>
      </p>
    </div>
  );
}

export default ErrorNotice;
