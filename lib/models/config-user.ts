import mongoose from "mongoose";

const environmentSchema = new mongoose.Schema(
  {
    URLWS: { type: String, required: true },
    NOMEDOAMBIENTE: { type: String, required: true },
    MOVIMENTOS_SOLICITACAO_COMPRAS: { type: [String], default: [] },
    MOVIMENTOS_ORDEM_COMPRA: { type: [String], default: [] },
    MOVIMENTOS_NOTA_FISCAL_PRODUTO: { type: [String], default: [] },
    MOVIMENTOS_NOTA_FISCAL_SERVICO: { type: [String], default: [] },
    MOVIMENTOS_OUTRAS_MOVIMENTACOES: { type: [String], default: [] },
    MODULOS: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { _id: false },
);

const configUserSchema = new mongoose.Schema(
  {
    ID: { type: Number, required: false },
    CODUSUARIO: { type: String, required: true, unique: true },
    SENHA: { type: String, required: true },
    CODCLIENTE: { type: String, required: false, trim: true },
    NOMECLIENTE: { type: String, required: true, trim: true },
    NOME_CONTATO: { type: String, required: true, trim: true },
    EMAIL: { type: String, required: true, trim: true, lowercase: true },
    TELEFONE: { type: String, required: true, trim: true },
    AMBIENTES: { type: [environmentSchema], default: [] },
  },
  { timestamps: true, collection: "configusers" },
);

export type ConfigUserDoc = mongoose.InferSchemaType<typeof configUserSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ConfigUser =
  (mongoose.models.ConfigUser as mongoose.Model<ConfigUserDoc>) ||
  mongoose.model<ConfigUserDoc>("ConfigUser", configUserSchema);

