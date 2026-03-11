import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ERP SaaS",
  description: "ERP multi-tenant",
};

function getTenantFromHeaders() {
  const h = headers();
  return h.get("x-tenant") ?? "default";
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
