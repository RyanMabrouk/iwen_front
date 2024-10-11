import getSession from "@/api/getSession";
import { redirect } from "next/navigation";
import SignUpForm from "./ui/SignUpForm";

export default async function Page() {
  const { session } = await getSession();

  if (session) redirect("/home");
  return <SignUpForm />;
}
