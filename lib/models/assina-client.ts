import mongoose from "mongoose";

const trialSchema = new mongoose.Schema(
  {
    startedAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    days: { type: Number, required: true },
  },
  { _id: false },
);

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    passwordSalt: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  { _id: false },
);

const assinaClientSchema = new mongoose.Schema(
  {
    tenantKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: { type: String, required: true, trim: true, lowercase: true },
    telefone: { type: String, required: true, trim: true },
    nome: { type: String, required: true, trim: true },
    empresa: { type: String, required: true, trim: true },
    cnpj: { type: String, required: true, trim: true },
    admin: { type: adminSchema, required: true },
    status: {
      type: String,
      enum: ["trial", "active", "blocked", "inactive", "cancelled"],
      default: "trial",
      required: true,
    },
    access: {
      blocked: { type: Boolean, default: false },
      blockedReason: { type: String, default: null },
    },
    trial: { type: trialSchema, required: true },
  },
  { timestamps: true, collection: "assina" },
);

assinaClientSchema.index({ tenantKey: 1 }, { unique: true });
assinaClientSchema.index({ email: 1 });

export type AssinaClientDoc = mongoose.InferSchemaType<typeof assinaClientSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const AssinaClient =
  (mongoose.models.AssinaClient as mongoose.Model<AssinaClientDoc>) ||
  mongoose.model<AssinaClientDoc>("AssinaClient", assinaClientSchema);

