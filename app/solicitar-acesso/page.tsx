import { redirect } from "next/navigation";
import { resolveTenantKey } from "@/lib/tenant";

export default function SolicitarAcessoPage() {
  const tenant = resolveTenantKey();

  if (tenant && tenant !== "public") {
    redirect("/");
  }
  redirect("/register");
}
