import { SelectOption } from "../components/select";
import { TOKEN_KEY } from "./constants";

// Truncate a number to avoid unnecessary trailing zeros
export const truncateDecimal = (num: number | string): string => {
  const numStr = num.toString();
  const decimalIndex = numStr.indexOf(".");

  if (decimalIndex === -1) return numStr;

  const beforeDecimal = numStr.slice(0, decimalIndex);
  const afterDecimal = numStr.slice(decimalIndex + 1);

  let leadingZeros = 0;
  for (const char of afterDecimal) {
    if (char !== "0") break;
    leadingZeros++;
  }

  const truncatedDecimal = Number(`0.${afterDecimal}`)
    .toFixed(leadingZeros + 2)
    .split(".");

  const roundedBeforeDecimal = truncatedDecimal[0];
  const truncatedAfterDecimal = truncatedDecimal[1];

  return `${Number(beforeDecimal) + Number(roundedBeforeDecimal)}.${
    truncatedAfterDecimal ?? ""
  }`;
};

// Add thousand separators to a number
export const thousandSeparator = (value: string | number): string | null => {
  if (!value) return null;

  const numStr = value.toString();
  const [integerPart, decimalPart] = numStr.split(".");

  return [integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ","), decimalPart]
    .filter(Boolean)
    .join(".");
};

// Format a number as currency with truncation and thousand separators
export const formatCurrency = (value: string | number): string => {
  if (!value) return "--";

  const formattedValue = value.toString().replace(/,/g, "");
  return thousandSeparator(truncateDecimal(formattedValue)) ?? "--";
};

// Wrap a string at a specified length with newlines
export const wrapString = (value: string = "", length: number = 15): string => {
  return value.match(new RegExp(`.{1,${length}}`, "g"))?.join("\n") ?? value;
};

// Return the value from a SelectOption or string
export const returnOptionValue = (
  selectString: SelectOption | string
): string => {
  return typeof selectString === "string"
    ? selectString
    : selectString.value || "";
};

export function getSavedUserToken() {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(TOKEN_KEY);
  } else {
    getSavedUserToken();
  }
}

export function saveUserToken(token: string) {
  if (typeof window !== "undefined")
    window.localStorage.setItem(TOKEN_KEY, token);
}

export function deleteUserToken() {
  if (typeof window !== "undefined") {
    return window.localStorage.removeItem(TOKEN_KEY);
  } else {
    deleteUserToken();
  }
}

