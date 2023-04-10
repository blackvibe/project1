import { A, Meta, Title } from "solid-start";
import { t } from "./../../store"

export default function Contacts() {
  return (
    <>
      <Title>{t.title.api}</Title>
      <Meta name="description" content={t.description.api}/>
      <main class="m-auto max-w-lg">
        <div class="p-6 sm:p-10 overflow-hidden rounded-3xl ml-2 mr-2 md:ml-0 md:mr-0 shadow-xl border">
          <h1 class="text-4xl mb-8 text-gray-600">Документация по API</h1>
          <p class="text-md">Для получения документации API обратитесь по Email адресу: support@smsvibe.ru</p>
        </div>
      </main>
    </>

  );
}
