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
            height={22}
            width={22}
          />
        </div>
      </div>
    </Link>
  );
}

export default GoBackLink;
