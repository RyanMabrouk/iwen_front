export interface QueryParam {
  name: string;
  value: string | number | boolean | null | undefined;
}

interface CreateNewPathnameParams {
  currentPathname: string;
  currentSearchParams: URLSearchParams;
  values: QueryParam[];
}

export default function createCompletePathName({
  currentPathname,
  currentSearchParams,
  values,
}: CreateNewPathnameParams): string {
  // Clone the existing search params to avoid mutating the original
  const params = new URLSearchParams(currentSearchParams.toString());

  values.forEach(({ name, value }) => {
    if (value === null || value === undefined) {
      // Remove the parameter if the value is null or undefined
      params.delete(name);
    } else {
      // Convert the value to string and set/update the parameter
      params.set(name, String(value));
    }
  });

  const queryString = params.toString();

  // Return the pathname with the updated query string if it exists
  return queryString ? `${currentPathname}?${queryString}` : currentPathname;
}
