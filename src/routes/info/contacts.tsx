import { A, Meta, Title } from "solid-start";
import { t } from "./../../store"

export default function Contacts() {
  return (
    <>
      <Title>{t.title.contacts}</Title>
      <Meta name="description" content={t.description.contacts}/>
      <main class="m-auto max-w-lg">
      <div class="p-6 sm:p-10 overflow-hidden rounded-3xl ml-2 mr-2 md:ml-0 md:mr-0 shadow-xl border">
          <h1 class="text-4xl mb-8 text-gray-600">Наши контакты</h1>

          <p>Email: <b>{"support@smsvibe.ru"}</b></p>
          <p>ФИО: Шин Анастасия Сергеевна</p>
          <p>ИНН: 760700346971</p>
          <p>
            Договор об отказе от услуг: <a href="/info/refund" class="text-blue-600"
            >https://smsvibe.ru/info/refund</a>
          </p>
        </div>
      </main>
    </>

  );
}
