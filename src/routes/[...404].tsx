import { A } from "solid-start";
import { HttpStatusCode } from "solid-start/server";

export default function NotFound() {
  return (
    <>
    <HttpStatusCode code={404} />
    <main class="text-center mx-auto p-4">
      <h1 class="max-6-xs text-6xl text-teal-600 font-thin uppercase mt-10 mb-6">
        Упс, 404 ошибка
      </h1>
      <p class="font-medium text-sm text-gray-600">Такой страницы не существует, перейдите на <A href="/" class="text-blue-600">главную страницу</A> для выбора номера</p>
    </main>
    </>
   
  );
}
