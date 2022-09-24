import React, { ChangeEvent, useCallback, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import _ from "lodash";

function TaskSorter() {
  const DefaultSortState = "sort-date-created";
  const [sortState, setSortState] = useState<string>(DefaultSortState);

  const filterSortID = useCallback((ID: string) => {
    return ID.replaceAll(/(sort|-)/g, " ").trim();
  }, []);

  const changeSortState = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setSortState(() => {
        const newState = e.currentTarget.id;
        return newState;
      });
    },
    []
  );

  return (
    <div>
      <div className="d-flex align-items-center" style={{ fontSize: "0.9rem" }}>
        Sort By:{" "}
        <Dropdown drop="down">
          <Dropdown.Toggle
            variant="outline-light"
            className="text-dark"
            id="sort-task-dropdown"
          >
            {_.startCase(_.toLower(filterSortID(sortState)))}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item id={DefaultSortState} onClick={changeSortState}>
              Date Created
            </Dropdown.Item>
            <Dropdown.Item id="sort-deadline" onClick={changeSortState}>
              Deadline
            </Dropdown.Item>
            <Dropdown.Item id="sort-priority" onClick={changeSortState}>
              Priority
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default TaskSorter;
