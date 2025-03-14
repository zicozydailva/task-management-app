import { format } from "date-fns";

const getFormattedDate = (date) => {
  if (!date) return null;

  if (typeof date === "string") {
    return date;
  } else if (date instanceof Date) {
    return format(date, "yyyy-MM-dd'T'HH:mm:ss");
  } else if (date && typeof date.toDate === "function") {
    return format(date.toDate(), "yyyy-MM-dd'T'HH:mm:ss");
  } else {
    console.error("Unexpected date type:", date);
    return null;
  }
};

export default getFormattedDate;
