import { createServerData$ } from "solid-start/server";
import { logout } from "~/session.server";

export default function Logout() {
    return createServerData$(
        async (_, { request }) => {
            return logout(request)
        }
    )
}