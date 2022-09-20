import { ReactElement } from "react";

interface TaskDetailRowProps {
  label: string;
  valueSpan: ReactElement;
  svg: ReactElement;
}

function TaskDetailRow({ label, valueSpan, svg }: TaskDetailRowProps) {
  return (
    <div className="d-flex align-items-center gap-2">
      <>
        <div className="d-flex align-items-center gap-1">
          <>
            {svg}
            <b>{label}</b>
          </>
        </div>
        {valueSpan}
      </>
    </div>
  );
}

export default TaskDetailRow;
