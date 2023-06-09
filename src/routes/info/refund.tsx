import { A, Meta, Title } from "solid-start";
import { t } from "./../../store"

export default function Contacts() {
  return (
    <>
     <Title>{t.title.refund}</Title>
     <Meta name="description" content={t.description.refund}/>
     <main class="m-auto max-w-lg">
    <div class="p-10 sm:p-0">
      <h1 class="text-4xl mb-8 text-gray-600">
        Информация об расторжении договора
      </h1>
      <p class="font-semibold">
        Если по каким-либо причинам Вы решили отказаться от исполнения договора
        о выполнении работ (оказании услуг), то можете сделать это в
        соответствии с Законом РФ «О защите прав потребителей» от 07.02.1992 №
        2300-1. Потребитель вправе расторгнуть договор о выполнении работы
        (оказании услуги) в любое время, уплатив исполнителю часть цены
        пропорционально части выполненной работы (оказанной услуги) до получения
        извещения о расторжении указанного договора и возместив исполнителю
        расходы, произведенные им до этого момента в целях исполнения договора,
        если они не входят в указанную часть цены работы (услуги). ⦁ Потребитель
        при обнаружении недостатков оказанной услуги вправе по своему выбору
        потребовать: 1. Безвозмездного устранения недостатков; 2.
        Соответствующего уменьшения цены; 3. Возмещения понесенных им расходов
        по устранению недостатков своими силами или третьими лицами; ⦁
        Потребитель вправе предъявлять требования, связанные с недостатками
        оказанной услуги, если они обнаружены в течение гарантийного срока, а
        при его отсутствии в разумный срок, в пределах двух лет со дня принятия
        оказанной услуги; ⦁ При отказе от исполнения договора потребитель имеет
        право на возврат выплаченных исполнителю денежных сумм; ⦁ Потребитель
        вправе потребовать также полного возмещения убытков, причиненных ему в
        связи с недостатками выполненной работы (оказанной услуги). ⦁
        Исполнитель отвечает за недостатки услуги, на которую не установлен
        гарантийный срок, если потребитель докажет, что они возникли до ее
        принятия им или по причинам, возникшим до этого момента;
      </p>
    </div>
  </main>
    </>
   
  );
}
