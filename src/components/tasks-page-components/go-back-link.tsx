import Image from "next/image";
import Link from "next/link";
import arrowRight from "../../images/arrow-right.svg";

function GoBackLink() {
  return (
    <Link href="/">
      <div className="d-flex align-items-center mb-1">
        <Image
          style={{ transform: "scaleX(-1)" }}
          src={arrowRight}
          alt="Go Back"
          height={12}
          width={12}
        />
        <a
          className="text-decoration-none text-gray"
          style={{ fontSize: "0.8rem" }}
        >
          Go Back
        </a>
      </div>
    </Link>
  );
}

export default GoBackLink;
