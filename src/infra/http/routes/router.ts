import Router from "@koa/router";
import { buildSchema, GraphQLError } from "graphql";
import { createHandler } from 'graphql-http/lib/use/koa';
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
  createHandler({
    schema: buildSchema(SCHEMA),
    rootValue: RESOLVERS,
    formatError: (error) => {
      
      if(error instanceof GraphQLError) {
        console.error("GraphQL Error:", error);
        if(error.originalError !== undefined && !(error.originalError instanceof GraphQLError)) {
          return new GraphQLError("Internal Server Error")
        }
      }
      return error
    },
  })
);

router.get("/playground", async (ctx) => {
   ctx.type = "text/html";
   ctx.body = `
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GraphiQL 4 with React 19 and GraphiQL Explorer</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      /* in Firefox */
    }

    #graphiql {
      height: 100dvh;
    }

    .loading {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
    }
  </style>
  <link rel="stylesheet" href="https://esm.sh/graphiql@4.0.0/dist/style.css" />
  <link rel="stylesheet" href="https://esm.sh/@graphiql/plugin-explorer@4.0.0/dist/style.css" />

  <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react@19.1.0",
          "react/jsx-runtime": "https://esm.sh/react@19.1.0/jsx-runtime",

          "react-dom": "https://esm.sh/react-dom@19.1.0",
          "react-dom/client": "https://esm.sh/react-dom@19.1.0/client",

          "graphiql": "https://esm.sh/graphiql@4.0.0?standalone&external=react,react/jsx-runtime,react-dom,@graphiql/react",
          "@graphiql/plugin-explorer": "https://esm.sh/@graphiql/plugin-explorer@4.0.0?standalone&external=react,react/jsx-runtime,react-dom,@graphiql/react,graphql",
          "@graphiql/react": "https://esm.sh/@graphiql/react@0.30.0?standalone&external=react,react/jsx-runtime,react-dom,graphql,@graphiql/toolkit",

          "@graphiql/toolkit": "https://esm.sh/@graphiql/toolkit@0.11.2?standalone&external=graphql",
          "graphql": "https://esm.sh/graphql@16.11.0"
        }
      }
    </script>
  <script type="module">
    // Import React and ReactDOM
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    // Import GraphiQL and the Explorer plugin
    import { GraphiQL } from 'graphiql';
    import { createGraphiQLFetcher } from '@graphiql/toolkit';
    import { explorerPlugin } from '@graphiql/plugin-explorer';

    const fetcher = createGraphiQLFetcher({
      url: '/graphql',
    });
    const explorer = explorerPlugin();

    function App() {
      return React.createElement(GraphiQL, {
        fetcher,
        plugins: [explorer],
      });
    }

    const container = document.getElementById('graphiql');
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(App));
  </script>
</head>

<body>
  <div id="graphiql">
    <div class="loading">Loading…</div>
  </div>
</body>

</html>`;
});

