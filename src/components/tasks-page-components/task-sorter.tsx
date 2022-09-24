import _ from "lodash";
import Image from "next/image";
import { useCallback } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import TaskSortMethods from "../../enums/task-sorter-methods";
import invertIcon from "../../images/invert.svg";
import utilStyles from "../../styles/modules/util-styles.module.scss";

interface TaskSorterProps {
  sortState: string;
  changeSortStateHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  arraySortInverterHandler: () => void;
}

function TaskSorter({
  sortState,
  changeSortStateHandler,
  arraySortInverterHandler,
}: TaskSorterProps) {
  const filterSortID = useCallback((ID: string) => {
    return _.startCase(_.toLower(ID.replaceAll(/(task|sort|-)/g, " ").trim()));
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-end"
      style={{ fontSize: "0.8rem" }}
    >
      Sort By:{" "}
      <Dropdown drop="down">
        <Dropdown.Toggle
          variant="outline-light"
          className="text-dark"
          id="sort-task-dropdown"
          style={{ fontSize: "0.8rem" }}
          title="task-sorter"
        >
          {filterSortID(sortState)}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ fontSize: "0.8rem" }}>
          {Object.values(TaskSortMethods).map((value, index) => {
            return (
              <Dropdown.Item
                key={value}
                id={value}
                onClick={changeSortStateHandler}
                eventKey={index}
              >
                {filterSortID(value)}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <Image
        src={invertIcon}
        alt="invert sort icon"
        className={utilStyles.rotateOnActive}
        onClick={arraySortInverterHandler}
      />
    </div>
  );
}

export default TaskSorter;
