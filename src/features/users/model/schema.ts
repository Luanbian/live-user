import { z } from "zod";
import { ObjectId } from "../../../services";

export const COLLECTION_USERS = "live_user";

export const userSchema = z.object({
  name: z.string().default(""),
  email: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type UserDocument = User & { _id: ObjectId | string };
