import { Schema, model } from "mongoose";

import { CategoriesModel, ICategories } from "./categories.interfaces";

const CategoriesSchema = new Schema<ICategories, CategoriesModel>(
  {
    interestedUsers: {
      type: String,
      required: true,
      default: 0,
    },
    respondedUsers: {
      type: String,
      required: true,
      default: 0,
    },
    serviceNeedsTo: {
      type: String,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Categories = model<ICategories, CategoriesModel>(
  "Categories",
  CategoriesSchema
);
