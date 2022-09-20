import formatDate from "./dateFormatter";
import _ from "lodash";

function processDeadline(deadline: Date | string) {
  return deadline === "" ? "None" : formatDate(deadline);
}

function processPriority(priority: string) {
  return priority === "" ? "Not specified" : _.capitalize(priority);
}

function processTaskStatus(status: boolean) {
  return !status ? "Pending" : "Done";
}

function processDescription(description: string) {
  return description === "" ? "No Description" : description;
}

export { processDeadline, processPriority, processTaskStatus, processDescription };
