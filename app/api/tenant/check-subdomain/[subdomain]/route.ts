import { NextResponse } from "next/server";
import { isSubdomainAvailable } from "@/lib/assina";

export async function GET(
  _req: Request,
  { params }: { params: { subdomain: string } },
) {
  try {
    const subdomain = String(params.subdomain ?? "").trim().toLowerCase();
    if (!subdomain) {
      return NextResponse.json({ available: false }, { status: 400 });
    }

    const available = await isSubdomainAvailable(subdomain);
    return NextResponse.json({ available });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Erro ao verificar subdomínio" }, { status: 500 });
  }
}

