import { A, Title } from "solid-start";
import { t } from "./../../store"

export default function Contacts() {
  return (
    <>
     <Title>{t.title.contacts}</Title>
     <main class="m-auto max-w-lg">
    <div class="p-10 sm:p-0">
      <h1 class="text-4xl mb-8 text-gray-600">Наши контакты</h1>

      <p>Email: <b>{"support@smsvibe.ru"}</b></p>
      <p>ФИО: Шин Анастасия Сергеевна</p>
      <p>ИНН: 760700346971</p>
      <p>
        Договор об отказе от услуг: <a href="/refund" class="text-blue-600"
          >https://smsvibe.ru/info/refund</a>
      </p>
    </div>
  </main>
    </>
   
  );
}
