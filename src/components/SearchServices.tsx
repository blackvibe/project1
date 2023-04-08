
import { fuzzySearch } from "../helpers";
import { createSignal, createEffect } from 'solid-js';
import { createStore, produce } from "solid-js/store";
import { t } from "./../store";

export default function SearchServices(props: any) {

    const [searchValue, setSearchValue] = createSignal("")

    function letSearch(e: any) {
        setSearchValue(e.currentTarget.value)
    }


    createEffect(() => {
        const searchServices = searchValue().trim().length > 0
            ? fuzzySearch(searchValue().trim(), props.store.services, ["LocalizedName", "LocalizedDescription"])
            : props.store.services;
        props.setStore(produce((store: any) => {
            store.filteredServices = searchServices
                ?.map((service: any) => store.filteredServices.find((fs: any) => fs.Uid === service.Uid) || service)
                .filter((service: any) => searchServices.some((fs: any) => fs.Uid === service.Uid));
        }));


    });

    return (
        <>
            <div class="p-2 relative">
                <div class="absolute inset-y-0 left-0 top-0 pt-5 pl-5 pointer-events-none">
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <div class="border-b">
                    <input
                        disabled={props.store.services?.length === 0}
                        onInput={letSearch}
                        type="text"
                        autocomplete="off"
                        placeholder={t.main.SearchPlaceholder}
                        class="pl-10 w-full block p-2 pb-3 text-gray-900 disabled:opacity-[50%]"
                    />
                </div>

            </div>
        </>
    )
}