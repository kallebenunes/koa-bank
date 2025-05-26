import { QUERIES } from "./queries";
import { MUTATIONS } from "./mutations";

export const RESOLVERS = {
  ...QUERIES,
  ...MUTATIONS
}