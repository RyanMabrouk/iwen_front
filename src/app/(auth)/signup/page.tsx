import getSession from "@/api/getSession";
import { redirect } from "next/navigation";
import SignUpForm from "./ui/SignUpForm";

export default async function Page() {
  return <SignUpForm />;
}
