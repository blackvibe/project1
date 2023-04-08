import { useLocation, A } from "solid-start";
import { createEffect, createRenderEffect, createSignal, Show } from "solid-js";
import { currentUser, t } from "../store";

export default function Header(props:any) {

    const [sidebarIsShow, setSidebarIsShow] = createSignal(false);

    function showSidebar() {
        setSidebarIsShow(!sidebarIsShow());
        document.body.classList.toggle("overflow-hidden");
    }

    const location = useLocation();
    const active = (path: string) =>
        path == location.pathname
            ? "border-sky-600"
            : "border-transparent hover:border-sky-600";

            return (
                <>
                  <header class="mx-auto max-w-screen-xl px-2 sm:px-6 mt-5 mb-5">
                    <A
                      href="/"
                      class="inline-block text-teal-600 transition hover:text-orange-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="42"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          d="m7 10.25.43.76c.28.48.42.72.42.99s-.14.5-.42 1l-.43.75c-1.24 2.17-1.86 3.25-1.38 3.8.49.53 1.63.03 3.92-.97l6.27-2.75c1.8-.78 2.7-1.18 2.7-1.83 0-.65-.9-1.05-2.7-1.83L9.54 7.42c-2.29-1-3.43-1.5-3.92-.96-.48.54.14 1.62 1.38 3.79Z"
                        />
                      </svg>
                    </A>
            
                    <div class="float-right inline-block text-sm text-gray-600">
                      <nav class="hidden md:inline-block leading-[48px]">
                        <ul class="">
                          <li class="inline">
                            <A class="transition hover:text-gray-400" href="/info/about">
                              { t.header?.About }
                            </A>
                          </li>
                          <li class="inline ml-5">
                            <A class="transition hover:text-gray-400" href="/info/offer">
                              {t.header?.Offer}
                            </A>
                          </li>
                          <li class="inline ml-5">
                            <A class="transition hover:text-gray-400" href="/info/contacts">
                              {t.header?.Contacts}
                            </A>
                          </li>
                          <li class="inline ml-5">
                            <A class="transition hover:text-gray-400" href="/info/api">
                              {t.header?.api}
                            </A>
                          </li>
                        </ul>
                      </nav>
                      <div class="float-right sm:ml-10 text-white cursor-pointer font-medium select-none">
                        <Show when={currentUser()?.Auth}>
                          <a
                            href="/payment/pay"
                            class="transition px-4 inline-block rounded-full shadow bg-teal-600 p-2.5 hover:bg-teal-700 mr-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1.5"
                              class="w-6 h-6 inline mr-1"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5z"
                              />
                            </svg>
                            <span>Баланс: {currentUser().Balance} ₽</span>
                          </a>
                          <a
                            href="/payment/pay"
                            class="transition inline-block rounded-full shadow bg-teal-600 p-2.5  hover:bg-teal-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              class="w-6 h-6 inline-block "
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 6v12m6-6H6"
                              />
                            </svg>
                          </a>
                          <Show
                            when={currentUser().Balance == 0 && props.path != "/payment/pay" && !sidebarIsShow()}
                          >
                            <div class="tooltip absolute select-none bg-orange-500 after:!border-t-orange-500 animate-bounce pl-4 pt-2 pb-2 rounded-2xl mt-7 z-20 w-[200px] after:right-[14%]">
                              <p>{t.tooltip?.start_work}</p>
                            </div>
                          </Show>
            
                          <a
                            href="/auth/logout"
                            class="hidden sm:inline-block rounded-full text-teal-600 transition bg-gray-100 hover:bg-gray-200 p-2.5 px-4 ml-4"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6 inline-block mr-1"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                              />
                            </svg>
                            Выйти
                          </a>
                        </Show>
            
                        <Show when={!currentUser() || currentUser()?.Auth === false}>
                          <a
                            href="/auth/login"
                            class="transition inline-block rounded-3xl px-4 shadow bg-teal-600 p-2.5  hover:bg-teal-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1.5"
                              class="w-6 h-6 inline-block"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.6 14.4a6 6 0 0 1-5.8 7.3V17m5.8-2.6a15 15 0 0 0 6.2-12.2A15 15 0 0 0 9.6 8.4m6 6A15 15 0 0 1 9.8 17m-.2-8.6a6 6 0 0 0-7.3 5.9H7m2.5-5.9A15 15 0 0 0 7 14.3M9.8 17h-.4A15 15 0 0 1 7 14.6a14.9 14.9 0 0 1 0-.3m-2.2 2.3A4.5 4.5 0 0 0 3.1 21a4.5 4.5 0 0 0 4.3-1.7M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                              />
                            </svg>
                            {t.auth?.Login}
                          </a>
                          <a
                            href="/auth/register"
                            class=" hidden sm:inline-block rounded-3xl text-white bg-sky-700 transition hover:bg-sky-800 p-2.5 px-4 ml-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1.5"
                              class="w-6 h-6 inline-block"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.3-4.1a3.4 3.4 0 1 1-6.7 0 3.4 3.4 0 0 1 6.8 0zM4 19.2v0a6.4 6.4 0 0 1 12.8 0v0a12.3 12.3 0 0 1-6.4 1.8C8 21 5.9 20.4 4 19.2z"
                              />
                            </svg>
            
                            {t.auth?.Register}
                          </a>
                        </Show>
            
                        <span
                          onClick={showSidebar}
                          class="ml-1 inline-block sm:hidden transition rounded-full shadow bg-teal-600 hover:bg-teal-700 p-2.5"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="w-6 h-6 inline-block"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </header>
                </>
              );
}