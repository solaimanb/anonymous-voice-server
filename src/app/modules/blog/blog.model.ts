import { Schema, model } from "mongoose";

import { BlogModel, IBlog } from "./blog.interfaces";

const BlogSchema = new Schema<IBlog, BlogModel>(
  {
    blogId: {
      type: String,
      required: true,
    },
    blogTitle: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
    },
    description: {
      type: String,
    },

    blogSlug: {
      type: String,
    },
    blogCategory: {
      type: String,
    },
    blogInfo: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Blog = model<IBlog, BlogModel>("Blog", BlogSchema);
