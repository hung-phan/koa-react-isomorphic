import graphiql from "./graphiql";
import application from "./application";

export default (router: Object) => {
  if (process.env.NODE_ENV === "development") {
    graphiql(router);
  }

  application(router);
};
