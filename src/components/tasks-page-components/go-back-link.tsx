import Link from "next/link";

function GoBackLink() {
  return (
    <Link href="/">
      <div className="d-flex align-items-center mb-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0081FB"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <a
          className="text-decoration-none text-secondary"
          style={{ fontSize: "0.9rem" }}
        >
          Go Back
        </a>
      </div>
    </Link>
  );
}

export default GoBackLink;
