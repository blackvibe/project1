import { A, Title, createRouteData, refetchRouteData } from "solid-start";
import { t } from "./../store"
import { For, createEffect, createRenderEffect, createResource, createSignal } from 'solid-js';
import { useRouteData, useIsRouting } from "solid-start";
import { isServer } from "solid-js/web";
import { createStore, produce } from "solid-js/store";
import SearchServices from "~/components/SearchServices";

const [store, setStore] = createStore<ServiceStore>({ services: [], filteredServices: [] });

export function routeData() {
  return createRouteData(async () => {
    const response = await fetch("https://api.smsvibe.ru/api/getServices?country=ru");
    return await response.json() as Service[];
  }, { key: ['services'] });
}

async function updateServices() {
  await refetchRouteData(["services"])
  // setTimeout(updateServices, 1000)
}

export default function Home() {
  const services = useRouteData<typeof routeData>();

  createRenderEffect(() => {
    setStore("filteredServices", services)
    setStore("services", services())
  })

  if (!isServer) updateServices()

  return (
    <>
      <Title>{t.title.home}</Title>
      <main class="text-center mx-auto text-gray-700 p-4">

        <SearchServices store={store} setStore={setStore} filteredServices={store.filteredServices} />
        <For each={store.filteredServices}>
          {(service) => (
            <div onClick={() => refetchRouteData(["services"])}>{service.LocalizedName} {service.Count}</div>
          )}

        </For>

      </main>
    </>

  );
}
