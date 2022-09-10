function formatDate(date: Date | undefined | string): string {
  if (typeof(date) === "string") {
    date = new Date(date);
  }
  return date!.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function convertDateToStringYYYYMMDD(date : Date | string) {
  if (typeof(date) === "string") {
    return;
  }
  var d = date,
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export {formatDate as default, convertDateToStringYYYYMMDD};
