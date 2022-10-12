import Image from "next/image";
import Link from "next/link";
import arrowRight from "../../images/arrow-right.svg";

function GoBackLink() {
  return (
    <Link href="/">
      <div className="d-flex align-items-center mb-1 gap-1">
        <div>
          <Image
            style={{ transform: "scaleX(-1)" }}
            src={arrowRight}
            alt="Go Back"
            height={14}
            width={14}
          />
        </div>
        <div>
          <a
            className="text-decoration-none text-gray"
            style={{ fontSize: "0.9rem" }}
          >
            Go Back
          </a>
        </div>
      </div>
    </Link>
  );
}

export default GoBackLink;
