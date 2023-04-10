// @refresh reload
import { Show, Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  useRouteData,
  useIsRouting,
} from "solid-start";
import "./tailwind.css";
import Header from "./components/Header";
import { Transition, TransitionGroup } from "solid-transition-group";

export default function Root() {
  const isRouting = useIsRouting();

  return (
    <Html lang="ru">
      <Head>

        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="format-detection" content="telephone=no" />
        <Meta name="HandheldFriendly" content="true" />

        <link rel="icon" type="image/svg+xml" href="//static.smsvibe.ru/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="//static.smsvibe.ru/share/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="//static.smsvibe.ru/share/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="//static.smsvibe.ru/share/favicon-16x16.png" />
        <link rel="manifest" href="//static.smsvibe.ru/share/site.webmanifest" />
        <link rel="mask-icon" href="//static.smsvibe.ru/share/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff"></meta>

        <link rel="stylesheet" href="//static.smsvibe.ru/misc.css" />

      </Head>
      <Body>
        <Show when={isRouting()}>
          <div class="w-full h-full absolute top-0 rounded-full bg-teal-600" style="transform: translateX(-100%);animation: 5000ms ease 0s infinite normal none running Page-Loading-Bar;transform-origin: left center; height: 5px"></div>
        </Show>
        <Suspense>
          <ErrorBoundary>
            <Header />

            {/* <Transition name="pageTransition"> */}
            <Routes>
              <FileRoutes />
            </Routes>


            {/* </Transition> */}

          </ErrorBoundary>
        </Suspense>
        <Scripts />
        <link rel="stylesheet" href="//static.smsvibe.ru/servicesIcons.css" />
        <link rel="stylesheet" href="//static.smsvibe.ru/countryIcons.css" />
      </Body>
    </Html>
  );
}
