import Image from "next/image";
import { ReactElement } from "react";

interface CardDetailRowProps {
  label: string;
  valueSpan: ReactElement;
  svg: any;
}

function CardDetailRow({ label, valueSpan, svg }: CardDetailRowProps) {
  return (
    <div className="d-flex align-items-center gap-2">
      <>
        <div className="d-flex align-items-center gap-1">
          <>
            <Image src={svg} alt="icon" />
            <b>{label}:</b>
          </>
        </div>
        {valueSpan}
      </>
    </div>
  );
}

export default CardDetailRow;
