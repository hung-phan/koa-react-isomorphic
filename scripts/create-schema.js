import fs from "fs";
import path from "path";
import { graphql } from "graphql";
import { introspectionQuery, printSchema } from "graphql/utilities";
import schema from "../app/server/application/apis/graphqlSchema";

const buildPath = path.join(__dirname, "../build");

// Save JSON of full schema introspection for Babel Relay Plugin to use
if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath);
}

graphql(schema, introspectionQuery).then(result => {
  fs.writeFileSync(
    path.join(buildPath, "schema.json"),
    JSON.stringify(result, null, 2)
  );

  // Save user readable type system shorthand of schema
  fs.writeFileSync(
    path.join(buildPath, "schema.graphql"),
    printSchema(schema)
  );
});
