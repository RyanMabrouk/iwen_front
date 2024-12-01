export default function objectToUrl(obj: Record<string, any>): string {
  const params = Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");

  return params;
}
