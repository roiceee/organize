function formateDateWithHours(date: Date | undefined | string): string {
  if (!date) {
    return "";
  }
  if (!date.toString().includes(" ")) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(date: Date | undefined | string): string {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function convertDateToStringYYYYMMDD(date: Date | string) {
  if (typeof date === "string") {
    return;
  }
  var d = date,
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function convertTo12Hrs(time: string) {
  // Check correct time format and split into components
  let timeArr = [];
  timeArr = time.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (timeArr.length > 1) {
    // If timeArr format correct
    timeArr = timeArr.slice(1); // Remove full string match value
    timeArr[5] = +timeArr[0] < 12 ? "AM" : "PM"; // Set AM/PM
    timeArr[0] = (+timeArr[0] % 12 || 12).toString(); // Adjust hours
  }
  return timeArr.join(""); // return adjusted time or original string
}

export { formateDateWithHours as default, convertDateToStringYYYYMMDD, convertTo12Hrs, formatDate };
