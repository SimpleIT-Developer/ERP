import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongo";
import { AssinaClient } from "@/lib/models/assina-client";
import { PlatformAdmin } from "@/lib/models/platform-admin";
import { ConfigUser } from "@/lib/models/config-user";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false, error: "Indisponível" }, { status: 404 });
  }

  await connectMongo();
  await AssinaClient.init();
  await PlatformAdmin.init();
  await ConfigUser.init();

  return NextResponse.json({
    ok: true,
    dbName: process.env.MONGODB_DBNAME ?? "assina_db",
    collections: {
      tenants: process.env.MONGODB_TENANTS_COLLECTION ?? "tenants",
      platformAdmins: "platform_admins",
      configUsers: "configusers",
    },
  });
}
