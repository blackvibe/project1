import {
  StartServer,
  createHandler,
  renderAsync,
} from "solid-start/entry-server";

import { updateTranslations } from "./store"
import { getUser, getUserToken } from "./session.server";
import { createServerData$, redirect } from "solid-start/server";

const alreadyAuthPaths = ["/auth/login"];
export default createHandler(

  ({ forward }) => { 
    return async event => {

      let user:any = await getUser(event.request)

      if (alreadyAuthPaths.includes(new URL(event.request.url).pathname)) {
        if(user?.Auth) {
          return redirect("/");
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
