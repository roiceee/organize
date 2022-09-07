function formatDate(date: Date | undefined): string {
  return date!.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default formatDate;
