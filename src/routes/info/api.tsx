import { A, Title } from "solid-start";
import { t } from "./../../store"

export default function Contacts() {
  return (
    <>
     <Title>{t.title.api}</Title>
     <main class="m-auto max-w-lg">
		<p class="text-center text-xl">Для получения API обратитесь по Email адресу: support@smsvibe.ru</p>

	</main>
    </>
   
  );
}
