import { mount, StartClient } from "solid-start/entry-client";
import { t, updateTranslations } from "./store"

import { createResource , createEffect } from "solid-js";

createResource (async () => {
    await updateTranslations();
    mount(() => <StartClient />, document);
});
