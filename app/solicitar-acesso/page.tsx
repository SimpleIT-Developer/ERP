import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function SolicitarAcessoPage() {
  const tenant = headers().get("x-tenant");

  if (tenant && tenant !== "public") {
    redirect("/");
  }
  redirect("/register");
}
