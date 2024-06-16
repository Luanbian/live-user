import { z } from "zod";

export const schemaValidationForCreateUser = z.object({
  name: z.string().default(""),
  email: z.string().email(),
});
