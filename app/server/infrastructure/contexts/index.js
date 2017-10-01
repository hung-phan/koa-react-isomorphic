import render from "./render";
import prerender from "./prerender";

export default function wrapContext(app: Object) {
  app.context.render = render;
  app.context.prerender = prerender;
}
