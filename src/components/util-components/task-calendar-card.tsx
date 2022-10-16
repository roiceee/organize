import Link from "next/link";
import TaskInterface from "../../interfaces/task-interface";
import arrowIcon from "../../images/arrow-right.svg";
import Image from "next/image";
import utilStyles from "../../styles/modules/util-styles.module.scss";
import { getPriorityColor } from "../../styles/style-scripts/task-styles-util";
import { convertTo12Hrs } from "../../utils/dateFormatter";

interface TaskCalendarCardProps {
  number: number;
  projectID: string;
  task: TaskInterface;
  closeModal: () => void;
}

function TaskCalendarCard({
  number,
  projectID,
  task,
  closeModal,
}: TaskCalendarCardProps) {
  return (
    <>
      <Link href={`/projects/${projectID}`}>
        <div className="d-flex">
          <div
            style={{ width: "2px" }}
            className={getPriorityColor(task)}
          ></div>
          <div
            className={`d-flex gap-2 p-1 align-items-center justify-content-between w-100 ${utilStyles.darkenOnHover}`}
            onClick={closeModal}
          >
            <div
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {number}. {task.title}
            </div>

            <div style={{ fontSize: "0.8rem", minWidth: "60px" }} className="p-1">
              {(task.time === "" || !task.time) ? "All day" : `${convertTo12Hrs(task.time)}`}
            </div>
          </div>
        </div>
      </Link>
      <hr className="my-1" />
    </>
  );
}

export default TaskCalendarCard;
