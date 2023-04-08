import { A, RouteDataArgs, Title, createRouteData, refetchRouteData } from "solid-start";
import { t, currentUser, setCurrentUser } from "./../store"
import { For, Show, createEffect, createRenderEffect, createResource, createSignal } from 'solid-js';
import { useRouteData, useIsRouting } from "solid-start";
import { isServer } from "solid-js/web";
import { createStore, produce } from "solid-js/store";
import SearchServices from "~/components/SearchServices";
import NotFound from "~/components/NotFound";
import CountrySelector from "~/components/CountrySelector";
import { createServerData$ } from "solid-start/server";
import LoadingPanel from "~/components/LoadingPanel";

const [store, setStore] = createStore<ServiceStore>({ services: [], filteredServices: [] });
const [isShowLoadingPanel, setIsShowLoadingPanel] = createSignal(false);
const [currentCountry, setCurrentCountry] = createSignal({
  Code: "ru",
  PhoneCode: 7,
  LocalizedName: "Россия",
})

let servicesListRef: any

export function routeData() {
  const [services] = createResource(async () => await getServices());
  const [countries] = createResource(async () => await getCountries());

  return { services, countries }
}

async function getServices() {
  const response = await fetch("https://api.smsvibe.ru/api/getServices?country=" + currentCountry().Code);
  return await response.json() as Service[];
}
async function getCountries() {
  const response = await fetch("https://api.smsvibe.ru/api/getCountries");
  return await response.json() as Country[];
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
  const { services, countries } = useRouteData<typeof routeData>();

  createRenderEffect(() => {
    setStore("filteredServices", services)
    setStore("services", services)
  })

  //if (!isServer) setTimeout(updateServices, 4000)

  function makeOrder(service: Service): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Title>{t.title.home}</Title>

      <main class="m-auto max-w-lg select-none">
        <CountrySelector
          updateServices={updateServices}
          countries={countries()}
          currentCountry={currentCountry()}
          setCurrentCountry={setCurrentCountry}
        />

        <div class="overflow-hidden rounded-3xl ml-2 mr-2 md:ml-0 md:mr-0 shadow-xl border">
          <div class="relative md:h-[425px]">
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
                          <Show when={currentUser()?.ID === 1}>
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
        </div>
      </main>
    </>

  );
}
