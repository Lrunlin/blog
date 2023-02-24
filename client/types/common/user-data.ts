import type { UserAttributes } from "../model-attribute";

type userDataType = Pick<
  UserAttributes,
  "id" | "name" | "auth" | "avatar_file_name" | "avatar_url"
>;
export type { userDataType };