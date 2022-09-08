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

export default formatDate;
