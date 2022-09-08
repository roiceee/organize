import Spinner from "react-bootstrap/Spinner";

function LoadingNotice() {
    return  (
        <div
          className="position-fixed top-50 w-100 text-center"
          style={{ width: "100vw" }}
        >
          <Spinner animation="grow" />
          <p>
            Loading your data...
          </p>
        </div>
      );
}

export default LoadingNotice;