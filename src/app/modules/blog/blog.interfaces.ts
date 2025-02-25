import { Model } from "mongoose";

export type IBlog = {
  blogId: String;
  blogTitle: String;
  featuredImage: String;
  content: String;
  excerpt: String;
  author: String;
  blogInfo: String;
  blogCategory: String;
  blogSlug: String;
  blogType: String;
};

export type BlogModel = Model<IBlog, Record<string, unknown>>;

export type IBlogFilters = {
  searchTerm?: string;
};
