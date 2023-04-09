import { For, Show, createSignal, createEffect } from "solid-js";
import { produce } from "solid-js/store";
import Number from "./OrderNumberField";
import SMS from "./OrderSMSField";
import { t } from "../store";
import { TransitionGroup } from "solid-transition-group";
import Modal from "../components/Modal";
import { formatPhoneNumber } from "../helpers";
import { ShowToast, Toast } from "../components/Toast";

export default function Orders(props: any) {
  const [isModalShow, setIsModalShow] = createSignal(false);
  const [modalData, setModalData] = createSignal({});
  const [modalLoading, setModalLoading] = createSignal(false);
  const [selectedOrderToRemove, setSelectedOrderToRemove]: any = createSignal();

  function startRemoveOrder(order: Order, index: any) {


    setSelectedOrderToRemove({ order, index });

    setModalData({
      title:
        t.deleteModal?.title +
        "+" +
        order.NumberCode +
        " " +
        formatPhoneNumber(order.Number),
      message: t.deleteModal?.message,
      firstBtnMsg: t.deleteModal?.button_yes,
      secondBtnMsg: t.deleteModal?.button_no,
      btnWaitText: t.deleteModal?.wait,
      tip: t.deleteModal?.tip,
      iconClass: order.Slug,
      mainBtnBgColor: "bg-red-600 hover:bg-red-700",
    });

    setIsModalShow(true);
  }

  async function removeOrder() {

    let cancelOrderResponse, cancelOrderResponseJson: any


    try {
      setModalLoading(true);

      cancelOrderResponse = await fetch(
        "https://api.smsvibe.ru/api/user/cancelOrder?token=" + props.user.Token + "&id=" +
        selectedOrderToRemove().order.ID
      )

      cancelOrderResponseJson = await cancelOrderResponse.json();
    } catch {
      console.log("fail to cancel order")
    }


    setModalLoading(false);
    setIsModalShow(false);

    if (cancelOrderResponseJson) {

      if (cancelOrderResponseJson.Reason === "TIME_DONT_EXPIRED") {
        ShowToast("Номер можно удалить только через 2 минуты после покупки", "error");
      } else {
        props.setStore(
          'orders',
          produce((orders: any) => {
            orders.splice(selectedOrderToRemove().index(), 1);
          }),
        );
        //setCurrentUser(props.user)
        ShowToast("Номер был удален", "success");
      }

    }
  }

  function cancelRemoveOrder() {
    setIsModalShow(false);
  }

  return (
    <>
      <Modal
        isShow={isModalShow()}
        data={modalData()}
        isLoading={modalLoading()}
        cancel={cancelRemoveOrder}
        confirm={removeOrder}
      />
      <div
        class="select-none z-20 bg-teal-600 text-white left-0 w-full fixed bottom-0 md:relative max-h-48 md:max-h-none overflow-auto overscroll-contain font-light text-xl"
        style="-webkit-overflow-scrolling: touch;"
      >
        <Show
          when={props?.user && props?.user?.Auth}
          fallback={
            <>
              <div class="pt-5 pb-5 text-center">
                <a href="/auth/register" class="border-b-2">
                  {t.main.RegisterLabel}
                </a>{" "}
                {t.main?.OrLabel}{" "}
                <a href="/auth/login" class="border-b-2">
                  {t.main?.LoginLabel}
                </a>
                ,{" "}{t.main?.EndRegisterLoginLabel}
              </div>
            </>
          }
        >
          <Show
            when={props.orders?.length > 0}
            fallback={
              <div class="pt-5 pb-5 text-center">
                {t.main?.SelectServiceLabel}
              </div>
            }
          >
            <div class="ml-3 mb-2 mt-2">{t.main?.YoursNumbers}</div>
          </Show>

          <table class="table-number-orders table-auto w-full text-left overflow-hidden">
            <tbody>
              <TransitionGroup name="orderRemove">
                <For each={props.orders}>
                  {(order, index) => (
                    <tr class="cursor-pointer rounded-lg">
                      <td class="service_icon align-top pl-2 sm:pl-4 pb-2 pt-1.5 w-6 h-6 sm:w-10 sm:h-10">
                        <div class="">
                          <div
                            class={
                              order.Slug +
                              " w-[32px] h-[32px] sm:w-[42px] sm:h-[42px]"
                            }
                          ></div>
                        </div>
                      </td>
                      <td class="pb-3">
                        <Number order={order} />
                        <SMS order={order} />
                      </td>
                      <td class="align-center">
                        <div class="text-base text-right font-medium -mt-2">
                          <button
                            onClick={() => startRemoveOrder(order, index)}
                            type="button"
                            class="p-2 mr-1 sm:ml-3 sm:mr-3 rounded-xl transition text-base font-medium text-white shadow-sm bg-teal-700 hover:bg-teal-800 w-auto sm:text-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1.5"
                              aria-hidden="true"
                              class="h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </For>
              </TransitionGroup>
            </tbody>
          </table>
        </Show>
      </div>
    </>
  );
}
