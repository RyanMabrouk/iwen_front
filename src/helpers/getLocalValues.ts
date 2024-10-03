"use client";
export default function getLocalValues(key: string) {
  let storedFormValues = null;
  try {
    storedFormValues = localStorage.getItem(key);
  } catch (error) {
    console.error("Error getting from localStorage", error);
  }
  const defaultFormValues = storedFormValues
    ? JSON.parse(storedFormValues)
    : null;
  return defaultFormValues;
}
