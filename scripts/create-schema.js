import fs from "fs";
import path from "path";
import { graphql } from "graphql";
import { introspectionQuery, printSchema } from "graphql/utilities";
import schema from "../app/server/application/apis/graphqlSchema";

// Save JSON of full schema introspection for Babel Relay Plugin to use
export default async () => {
  if (!fs.existsSync("../build")) {
    fs.mkdirSync("../build");
  }

  const result = await graphql(schema, introspectionQuery);

  if (result.errors) {
    console.error(
      "ERROR introspecting schema: ",
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, "../build/schema.json"),
      JSON.stringify(result, null, 2)
    );
  }

  // Save user readable type system shorthand of schema
  fs.writeFileSync(
    path.join(__dirname, "../build/schema.graphql"),
    printSchema(schema)
  );
};
