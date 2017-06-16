import fs from "fs";
import path from "path";
import { graphql } from "graphql";
import { introspectionQuery, printSchema } from "graphql/utilities";
import schema from "../app/server/application/apis/graphqlSchema";

// Save JSON of full schema introspection for Babel Relay Plugin to use
if (!fs.existsSync("../build")) {
  fs.mkdirSync("../build");
}

graphql(schema, introspectionQuery).then(result => {
  fs.writeFileSync(
    path.join(__dirname, "../build/schema.json"),
    JSON.stringify(result, null, 2)
  );

  // Save user readable type system shorthand of schema
  fs.writeFileSync(
    path.join(__dirname, "../build/schema.graphql"),
    printSchema(schema)
  );
});
