import { Schema, models, model, type InferSchemaType } from "mongoose";

const RecipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    config: {
      type: Schema.Types.Mixed,
      required: true,
    },
      createdBy: {
        type: String,
        required: false,
        index: true,
      },
    generatedCode: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export type RecipeDocument = InferSchemaType<typeof RecipeSchema>;

export const RecipeModel = models.Recipe ?? model("Recipe", RecipeSchema);
