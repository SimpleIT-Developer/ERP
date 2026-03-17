import mongoose from "mongoose";

const environmentSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Novo Ambiente" },
    enabled: { type: Boolean, default: true },
    webserviceBaseUrl: { type: String, default: "" },
    restBaseUrl: { type: String, default: "" },
    soapDataServerUrl: { type: String, default: "" },
    authMode: { type: String, enum: ["basic", "bearer"], default: "bearer" },
    tokenEndpoint: { type: String, default: "" },
    modules: { type: Map, of: Boolean, default: {} },
    menus: { type: Map, of: Boolean, default: {} },
    MOVIMENTOS_SOLICITACAO_COMPRAS: { type: [String], default: [] },
    MOVIMENTOS_ORDEM_COMPRA: { type: [String], default: [] },
    MOVIMENTOS_NOTA_FISCAL_PRODUTO: { type: [String], default: [] },
    MOVIMENTOS_NOTA_FISCAL_SERVICO: { type: [String], default: [] },
    MOVIMENTOS_OUTRAS_MOVIMENTACOES: { type: [String], default: [] },
  },
  {
    toJSON: { flattenMaps: true },
    toObject: { flattenMaps: true },
  },
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
    status: {
      type: String,
      enum: ["trial", "active", "blocked", "inactive", "cancelled"],
      default: "trial",
      required: true,
    },
    company: {
      legalName: { type: String, required: true, trim: true },
      tradeName: { type: String, required: true, trim: true },
      cnpj: { type: String, required: true, trim: true },
    },
    domains: {
      tenantHost: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
      },
    },
    environments: { type: [environmentSchema], default: [] },
    access: {
      blocked: { type: Boolean, default: false },
      blockedReason: { type: String, default: null },
    },
    trial: {
      startedAt: { type: Date, default: Date.now },
      endsAt: { type: Date, required: true },
      days: { type: Number, default: 7 },
    },
    audit: {
      createdAt: { type: Date, default: Date.now },
      createdBy: { type: String, default: "self_signup" },
    },
  },
  { timestamps: true, collection: process.env.MONGODB_TENANTS_COLLECTION ?? "tenants" },
);

assinaClientSchema.index({ tenantKey: 1 }, { unique: true });
assinaClientSchema.index({ "company.cnpj": 1 });
assinaClientSchema.index({ "domains.tenantHost": 1 }, { unique: true });

export type AssinaClientDoc = mongoose.InferSchemaType<typeof assinaClientSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Tenant =
  (mongoose.models.Tenant as mongoose.Model<AssinaClientDoc>) ||
  mongoose.model<AssinaClientDoc>("Tenant", assinaClientSchema);

export const AssinaClient = Tenant;
