import render from "./render";
import prerender from "./prerender";

export default function wrapContext(app: Object) {
  Object.assign(app.context, { render, prerender });
}
