import _ from "lodash";
import { useCallback } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import TaskSortMethods from "../../enums/task-sorter-methods";

interface TaskSorterProps {
  sortState: string;
  changeSortStateHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function TaskSorter({ sortState, changeSortStateHandler }: TaskSorterProps) {
  const filterSortID = useCallback((ID: string) => {
    return _.startCase(_.toLower(ID.replaceAll(/(task|sort|-)/g, " ").trim()));
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-end" style={{ fontSize: "0.9rem" }}>
      Sort By:{" "}
      <Dropdown drop="down">
        <Dropdown.Toggle
          variant="outline-light"
          className="text-dark"
          id="sort-task-dropdown"
        >
          {filterSortID(sortState)}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {Object.values(TaskSortMethods).map((value) => {
            return (
              <Dropdown.Item
                key={value}
                id={value}
                onClick={changeSortStateHandler}
              >
                {filterSortID(value)}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default TaskSorter;
