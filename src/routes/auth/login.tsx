import { t } from "../../store";
import { createSignal, Show } from "solid-js";
import { createServerAction$, createServerData$, redirect } from "solid-start/server";
import { getUser, login } from "./../../session.server";
import { createUserSession } from "../../session.server"
import { createCookieSessionStorage, FormError, RouteDataArgs, useRouteData } from "solid-start";

export function routeData() {

    return createServerData$((_, event:any) => {
        if (event.locals.user?.Auth) {
            throw redirect("/")
        }
    });
}

export default function Login() {
    const [isLoading, setIsLoading] = createSignal(false);

    let formRef: any

    const [loginStatus, { Form }] = createServerAction$(async (form: FormData, { request }) => {
        const email = form?.get("email") as string;
        const password = form?.get("password") as string;

        const user = await login({ email, password });

        if (user?.Status === false) {

            const fieldErrors = user?.Errors

            if (fieldErrors) {
                throw new FormError("FIELDS_INVALID", { fieldErrors });
            } else {
                if (user?.Reason === "LOGIN_FAILED") {
                    throw new FormError("LOGIN_FAILED");
                }
            }
        } else {
            return createUserSession(user.Token, "/");
        }

    });

    async function handleSubmit(e: any) {
        setIsLoading(true)
        formRef.submit()
    }
    return (
        <>
            <main class="m-auto max-w-lg select-none">
                <div class="p-4">
                    <div class="mx-auto max-w-lg text-center mb-8">
                        <h1 class="text-2xl font-bold sm:text-3xl">
                            {t.auth?.LoginWelcome}
                        </h1>

                        <p class="mt-4 text-gray-500">{t.auth?.LoginWelcomeDescription}</p>
                    </div>

                    <Form ref={formRef} method="post" action="/auth/login" >
                        <Show
                            when={
                                loginStatus.error
                            }
                        >
                            <p class="pl-4 pt-1 pb-1 mb-4 bg-red-500 rounded text-white">
                                {t.validator[loginStatus.error.message]}
                            </p>
                        </Show>
                        <div>
                            <div class="relative mt-1">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={loginStatus.input?.get("email") as string || ""}
                                    classList={{ 'border-red-500': loginStatus.error?.fieldErrors?.Email }}
                                    class="w-full rounded-xl border border-gray-300 p-4 pr-12 text-sm shadow-sm"
                                    placeholder={t.auth?.EmailPlaceholder}
                                />

                                <span class="absolute inset-y-0 right-4 mt-[17px]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        class="h-5 w-5 text-gray-400"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm0 0v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-9 9m4.5-1.2A9 9 0 0 1 12 21"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <Show when={loginStatus.error?.fieldErrors?.Email}>
                                <p class="mt-2 rounded-b text-red-500">
                                    {t.validator["Email|" + loginStatus.error?.fieldErrors?.Email.Tag]}
                                </p>
                            </Show>
                        </div>

                        <div class="mt-4">
                            <div class="relative">
                                <input
                                    type="password"
                                    name="password"
                                    value={loginStatus.input?.get("password") as string || ""}
                                    classList={{ 'border-red-500': loginStatus.error?.fieldErrors?.Password }}
                                    class="w-full rounded-xl border border-gray-300 p-4 pr-12 text-sm shadow-sm"
                                    placeholder={t.auth?.PasswordPlaceholder}
                                    autocomplete="current-password"
                                />

                                <span class="absolute inset-y-0 right-4 mt-[17px]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        class="h-5 w-5 text-gray-400"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M2.5 12a10 10 0 0 1 19 0 10 10 0 0 1-19 0z"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <Show when={loginStatus.error?.fieldErrors?.Password}>
                                <p class="mt-2 rounded-b text-red-500">
                                    {t.validator["Password|" + loginStatus.error?.fieldErrors?.Password.Tag]}
                                </p>
                            </Show>
                        </div>

                        <div class="mt-4 text-center">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                disabled={isLoading()}
                                class="w-full transition rounded-xl bg-teal-600 hover:bg-teal-700 px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
                            >
                                <Show when={isLoading()} fallback={t.auth?.Login}>
                                    <div class="loaderAnimate" />
                                </Show>
                            </button>

                            <p class="text-sm text-gray-500 pt-5 pb-3">
                                <span class="mr-2">{t.auth?.NoAccount}</span>
                                <a style="text-decoration: underline;" href="/auth/register">
                                    {t.auth?.Register}
                                </a>
                            </p>
                        </div>
                    </Form>
                </div>
            </main>
        </>
    );
}
