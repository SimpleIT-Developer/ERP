import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as unknown as {
  __mongooseCache?: MongooseCache;
};

function getCache(): MongooseCache {
  if (!globalForMongoose.__mongooseCache) {
    globalForMongoose.__mongooseCache = { conn: null, promise: null };
  }
  return globalForMongoose.__mongooseCache;
}

export async function connectMongo(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DBNAME ?? "assina_db";

  if (!uri) {
    throw new Error("MONGODB_URI não configurado");
  }

  const cache = getCache();
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(uri, {
        dbName,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      .then(() => mongoose);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
