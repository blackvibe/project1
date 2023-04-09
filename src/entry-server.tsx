import {
  StartServer,
  createHandler,
  renderAsync,
} from "solid-start/entry-server";

import { updateTranslations } from "./store"
import { getUser, getUserToken, logout } from "./session.server";
import { redirect } from "solid-start/server";

const alreadyAuthPaths = ["/auth/login", "/auth/register"];
export default createHandler(

  ({ forward }) => {
    return async event => {

      const user = await getUser(event.request)
      event.locals = { user }

      if (await getUserToken(event.request)) {
        if (user?.Auth === false) {
          return logout(event.request)
        } else {
          if (alreadyAuthPaths.includes(new URL(event.request.url).pathname)) {
            return redirect("/");
          }
        }
      }

      return forward(event);
    };
  },

  ({ forward }) => {
    return async event => {

      await updateTranslations()
      return forward(event);
    };
  },

  renderAsync((event) => <StartServer event={event} />)
);
