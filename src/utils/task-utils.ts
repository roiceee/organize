import formatDate from "./dateFormatter";
import _ from "lodash";

function processDeadline(deadline: Date | string) {
  return deadline === "" ? "None" : formatDate(deadline);
}

function processPriority(priority: string) {
  return priority === "" ? "Not specified" : _.capitalize(priority);
}

function processTaskStatus(status: boolean) {
  return !status ? "Not Done" : "Done";
}

export { processDeadline, processPriority, processTaskStatus };
