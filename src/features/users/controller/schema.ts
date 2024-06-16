import { z } from "zod";

export const schemaValidationForCreateUser = z.object({
  name: z.string(),
  email: z.string().email(),
});
