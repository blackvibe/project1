// @refresh reload
import { Suspense } from "solid-js";
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
} from "solid-start";
import "./tailwind.css";
import { t } from "./store"
import Header from "./components/Header";

export default function Root() {
  return (
    <Html lang="ru">
      <Head>
        
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="//static.smsvibe.ru/misc.css" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Header/>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
