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
        <link rel="stylesheet" href="//static.smsvibe.ru/misc.css" />
        <link rel="stylesheet" href="//static.smsvibe.ru/servicesIcons.css" />
        <link rel="stylesheet" href="//static.smsvibe.ru/countryIcons.css" />
      </Head>
      <Body classList={{ "grey-out": isRouting() }}>
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
      </Body>
    </Html>
  );
}
