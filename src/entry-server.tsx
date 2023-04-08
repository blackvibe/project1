import {
  StartServer,
  createHandler,
  renderAsync,
} from "solid-start/entry-server";

import { currentUser, updateTranslations } from "./store"
import { getUser, getUserToken, logout } from "./session.server";
import { createServerData$, redirect } from "solid-start/server";

import { setCurrentUser } from "./store";

const alreadyAuthPaths = ["/auth/login","/auth/register"];
export default createHandler(

  ({ forward }) => {
    return async event => {

      setCurrentUser(await getUser(event.request))

      if(await getUserToken(event.request)) {
        if(currentUser()?.Auth === false) {
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
