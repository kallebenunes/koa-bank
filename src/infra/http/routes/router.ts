import Router from "@koa/router";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "koa-graphql";
import { RESOLVERS } from "../resolvers";
import { SCHEMA } from "../graphql/schema";

export const router = new Router()

router.get('/health', (ctx)=>{
  ctx.status = 200
  ctx.body = {
    health: 'ok'
  }
})

router.all(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(SCHEMA),
    rootValue: RESOLVERS,
    graphiql: true,
    context: {
      value: 'test'
    }
  })
);

