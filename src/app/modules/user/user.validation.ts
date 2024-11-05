import { z } from "zod";

import { bloodGroup, gender } from "../mentor/mentor.constant";

const createMenteeZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    mentee: z.object({
      userName: z.string({
        required_error: "user name is required",
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: "Gender is required",
      }),

      email: z.string().email().optional(),
      age: z.string({
        required_error: "Age is required",
      }),
    }),
  }),
});

export const UserValidation = {
  createMenteeZodSchema,
};
