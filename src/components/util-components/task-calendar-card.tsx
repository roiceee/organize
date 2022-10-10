import Link from "next/link";
import TaskInterface from "../../interfaces/task-interface";
import arrowIcon from "../../images/arrow-right.svg";
import Image from "next/image";
import utilStyles from "../../styles/modules/util-styles.module.scss";
import { getPriorityColor } from "../../styles/style-scripts/task-styles-util";

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
            style={{ width: "2px"}}
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
            <div
              className="d-flex gap-1 align-items-center"
              style={{ minWidth: "100px" }}
            >
              <div
                style={{ fontSize: "0.8rem" }}
                className="text-decoration-underline"
              >
                Go to Project
              </div>
              <Image src={arrowIcon} alt="arrow-icon"></Image>
            </div>
          </div>
        </div>
      </Link>
      <hr className="my-1" />
    </>
  );
}

export default TaskCalendarCard;
