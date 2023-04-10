import { Meta, Title } from "solid-start";
import { t } from "./../store"
import { For, Show, createRenderEffect, createResource, createSignal } from 'solid-js';
import { useRouteData } from "solid-start";
import { createStore, produce } from "solid-js/store";
import SearchServices from "~/components/SearchServices";
import NotFound from "~/components/NotFound";
import CountrySelector from "~/components/CountrySelector";
import { createServerData$ } from "solid-start/server";
import LoadingPanel from "~/components/LoadingPanel";
import Orders from "~/components/Orders";
import { ShowToast, Toast } from "~/components/Toast";
import Modal from "~/components/Modal";

const [store, setStore] = createStore<MainStore>({ services: [], filteredServices: [], orders: [] });
const [isShowLoadingPanel, setIsShowLoadingPanel] = createSignal(false);
const [isModalShow, setIsModalShow] = createSignal(false);
const [modalData, setModalData] = createSignal();
const [modalLoading, setModalLoading] = createSignal(false);
const [selectedService, setSelectedService]: any = createSignal();

const [currentCountry, setCurrentCountry] = createSignal({
  Code: "ru",
  PhoneCode: 7,
  LocalizedName: "Россия",
})

let servicesListRef: any

export function routeData() {
  const [services] = createResource(async () => await getServices());
  const [countries] = createResource(async () => await getCountries());
  const user: any = createServerData$(async (_, event) => event.locals.user);
  const orders = createServerData$(async (_, event: any) => await getOrders(event.locals.user?.Token))

  return { services, countries, user, orders }
}

async function getServices() {
  const response = await fetch("https://api.smsvibe.ru/api/getServices?country=" + currentCountry().Code);
  return await response.json() as Service[];
}
async function getCountries() {
  const response = await fetch("https://api.smsvibe.ru/api/getCountries");
  return await response.json() as Country[];
}

async function getOrders(userToken: string) {
  const response = await fetch("https://api.smsvibe.ru/api/user/getOrders?token=" + userToken);
  return await response.json() as Order[];
}

async function updateServices(isCountryChanging = false) {
  if (isCountryChanging) setIsShowLoadingPanel(true)

  setStore("services", await getServices())

  if (!isCountryChanging) {
    setTimeout(updateServices, 4000)
  } else {
    setIsShowLoadingPanel(false)
  }
}

export default function Home() {
  const { services, countries, user, orders }: any = useRouteData<typeof routeData>();

  createRenderEffect(() => {
    setStore("filteredServices", services)
    setStore("services", services)
    setStore("orders", orders()?.Orders)
  })

  //if (!isServer) setTimeout(updateServices, 4000)

  function makeOrder(service: Service): void {

    if (!user()?.Auth) {
      return ShowToast(t.toast?.title.not_auth, t.toast?.message.not_auth, "error");
    }

    setSelectedService(service);

    setModalData({
      title: t.buyModal?.title + service.LocalizedName,
      message: t.buyModal?.message,
      firstBtnMsg: t.buyModal?.button_yes,
      secondBtnMsg: t.buyModal?.button_no,
      btnWaitText: t.buyModal?.button_wait,
      tip: t.buyModal?.tip,
      iconClass: service.Slug,
      badge: service.Price + " ₽",
      mainBtnBgColor: "bg-teal-600 hover:bg-teal-700",
    });

    setIsModalShow(true);
  }

  async function CancelOrder() {
    setIsModalShow(false);
  }

  function addOrder(order: any) {
    setStore(
      'orders',
      produce((orders: any) => {
        orders.unshift(order);
      }),
    );

    //updateBalance(props.user)
  }

  async function ConfirmOrder() {
    setModalLoading(true);

    let orderServiceResponse, orderServiceJson, orderStatus: any

    try {
      orderServiceResponse = await fetch(
        "https://api.smsvibe.ru/api/user/orderService?token=" + user().Token + "&slug=" +
        selectedService().Slug + "&country=" + selectedService().Country);
      orderServiceJson = await orderServiceResponse.json();
      orderStatus = orderServiceJson.Status;

      if (orderStatus != false) {

        addOrder(orderServiceJson);
        ShowToast(t.toast?.title.purchase_success, t.toast?.message.purchase_success, "success");

      } else {
        switch (orderServiceJson.Reason) {
          case "NOT_ENOUGH_MONEY":
            ShowToast(t.toast?.title.low_balance, t.toast?.message.low_balance, "error");
            break
          case "GET_SERVICE_RESULT_ERROR":
            ShowToast(t.toast?.title.unknown_error, t.toast?.message.unknown_error, "error");
            break
        }
      }
    } catch {
      console.log("fail to order Service")
    }

    setModalLoading(false);
    setIsModalShow(false);

  }

  return (
    <>
      <Title>{t.title.home}</Title>
      <Meta name="description" content={t.description.home} />

      <main class="m-auto max-w-lg select-none">
        <CountrySelector
          updateServices={updateServices}
          countries={countries()}
          currentCountry={currentCountry()}
          setCurrentCountry={setCurrentCountry}
        />
        <Toast/>
        <div class="overflow-hidden rounded-3xl ml-2 mr-2 md:ml-0 md:mr-0 shadow-xl border">
          <div class="relative md:h-[425px]">
            <Modal
              isShow={isModalShow()}
              data={modalData()}
              isLoading={modalLoading()}
              cancel={CancelOrder}
              confirm={ConfirmOrder}
            />
            <SearchServices store={store} setStore={setStore} filteredServices={store.filteredServices} />

            <LoadingPanel isShow={isShowLoadingPanel()} />
            <Show when={(store.filteredServices?.length || 0) > 0}>
              <ul ref={servicesListRef} class="cursor-pointer md:h-[367px] md:overflow-y-scroll overflow-x-hidden">
                {/* <TransitionGroup name="mainServices"> */}
                <For each={store.filteredServices}>
                  {(service, index) => (
                    <li
                      onClick={() => makeOrder(service)}
                      class=" transition sm:hover:bg-gray-200 pb-3 pt-3 table w-full"
                    >
                      <div class="table-cell align-top w-[76px]">
                        <div
                          class={
                            service.Slug + " w-[43px] h-[43px] ml-4 mr-4 sm:mr-2"
                          }
                        ></div>
                      </div>

                      <div class="table-cell align-top min-w-[120px]">
                        <p class="text-lg font-medium text-gray-900 leading-6">
                          {service.LocalizedName}

                          <span class="text-xs text-gray-400 ml-0 block min-[320px]:inline min-[320px]:ml-2">
                            {service.LocalizedDescription}

                          </span>
                        </p>
                        <p class="text-[14px] font-medium text-gray-500">
                          <Show when={user()?.ID === 1}>
                            {service.Prefix}{" "}
                          </Show>
                          <span>Страна: {t.country && t.country[service.Country]}. </span>
                          <span>

                            {t.main?.ServiceAvailaible} ≈ {service.Count}
                          </span>{" "}
                          <span>{t.main?.ServiceNumbersAvailaible}</span>
                        </p>
                      </div>
                      <div class="table-cell relative float-right">
                        <span class="block text-center bg-indigo-50 mr-2 sm:mr-4 ml-3 text-indigo-700 w-[65px] text-sm font-medium py-[5px] rounded-xl">
                          {service.Price}₽
                        </span>
                      </div>
                    </li>
                  )}
                </For>
                {/* </TransitionGroup> */}
              </ul>
            </Show>

            <Show when={(store.services?.length || 0) === 0}>
              <NotFound
                title="Сервисов пока нет"
                description="Пожалуйста, напишите нам, если вы хотите чтобы мы добавили определенный сервис для вас"
                currentCountry={currentCountry()}
              />
            </Show>

            <Show when={store.filteredServices?.length === 0 && (store.services?.length || 0) !== 0}>
              <NotFound
                title="Такой сервис не найден"
                description="Проверьте правильность написания. Если название введено верно, то напишите нам о том, какой сервис вам нужен, мы добавим в краткие сроки!"
                currentCountry={currentCountry()}
              />
            </Show>
          </div>
          <Orders orders={store.orders} setStore={setStore} user={user()} />
        </div>
      </main>
    </>

  );
}
