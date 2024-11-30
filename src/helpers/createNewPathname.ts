export default function createNewPathname({
  currentPathname,
  values,
}: {
  currentPathname: string;
  values: {
    name: string;
    value: any;
  }[];
}) {
  const params = new URLSearchParams();
  values.forEach(({ name, value }) => {
    params.set(name, value);
  });
  return currentPathname + "?" + params.toString();
}
