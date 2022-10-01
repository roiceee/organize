import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";
import ProjectInterface from "../../interfaces/project-interface";
import TaskInterface from "../../interfaces/task-interface";
import formatDate from "../../utils/dateFormatter";
import { processDescription } from "../../utils/task-utils";
interface DescriptionPopoverProps {
  title: string;
  project?: ProjectInterface;
  task?: TaskInterface;
}

function DescriptionPopover({ title, project, task }: DescriptionPopoverProps) {
  return (
    <Accordion className="my-2">
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <span style={{ fontSize: "0.9rem" }}>{title}</span>
        </Accordion.Header>
        <Accordion.Body style={{ overflowWrap: "break-word" }}>
          {project !== undefined && (
            <>
              <div>
                <b>Date Created:</b> {formatDate(project.dateCreated)}
              </div>
              <div>
                <b>Last Modified:</b> {formatDate(project.lastModified)}
              </div>
              <div>
                <b>Description:</b> {processDescription(project)}
              </div>
            </>
          )}
          {task !== undefined && <div>{processDescription(task)}</div>}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default DescriptionPopover;
