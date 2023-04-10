import { createSignal, Show, onMount, createResource, createRenderEffect } from "solid-js";
import { ShowToast, Toast } from "../../components/Toast";
import { Meta, RouteDataArgs, Title, useRouteData } from "solid-start";
import { isServer } from "solid-js/web";
import { createStore } from "solid-js/store";
import { createServerData$, redirect } from "solid-start/server";
import { t } from "~/store";

export function routeData() {
  return createServerData$((_, event) => {
    return event.locals.user
  });
}

export default function Pay() {
  const userData = useRouteData<typeof routeData>();

  const [typingTimer, setTypingTimer]: any = createSignal(null);
  const [isLoading, setIsLoading] = createSignal(true);
  const [amount, setAmount]: any = createSignal("50");
  const [amountLabel, setAmountLabel] = createSignal("50");
  const [loadingLabel, setLoadingLabel] = createSignal("Подождите, загружается форма оплаты")
  const [isPayComplete, setIsPayComplete] = createSignal(false)
  const [confToken, setConfToken] = createSignal("")
  const [user, setUser]: any = createSignal([])


  createRenderEffect(async () => {
    setUser(userData())

    if (!isServer) {

      const script = document.createElement('script');

      script.src = "https://yookassa.ru/checkout-widget/v1/checkout-widget.js";
      script.async = true;
      script.onload = async () => {
        await showPayForm()
      }

      document.body.appendChild(script);
    }
  })

  function checkIframeLoading() {
    const paymentFormIframe = document.querySelector("#payment-form iframe");
    paymentFormIframe?.addEventListener("load", hideLoading);
  }

  function hideLoading() {
    setIsLoading(false);
  }

  function showLoading() {
    setIsLoading(true)
  }

  function handleKeyUp(e: any) {
    clearTimeout(typingTimer());
    setTypingTimer(setTimeout(() => doneTyping(e), 400));
  }

  function handleKeyDown() {
    clearTimeout(typingTimer());
  }

  let payFormActionCompleted = false

  async function renderPayForm(confirmation_token: string) {

    const paymentForm = document.getElementById("payment-form")

    if (paymentForm) {
      paymentForm.innerHTML = "";
    }

    //@ts-ignore
    const checkout = new window.YooMoneyCheckoutWidget({
      confirmation_token: confirmation_token,
      return_url: "",
      customization: {},
      error_callback: function (error: any) {
        console.log(error);
      },
    });

    checkout.render("payment-form");

    checkout.on("complete", async () => {
      showLoading()
      setLoadingLabel("Подождите. Идет пополнение баланса. Не покидайте страницу, до появления подтверждения. Это может занять от 2 - 30 минут")
      checkout.destroy();

      if (payFormActionCompleted == false) startCheck()
      payFormActionCompleted = true

      async function startCheck() {

        if (!isPayComplete()) {
          const response = await checkPay(confToken().replace("ct-", ""));
          if (response.Status === true) {
            setIsPayComplete(true);
            //setCurrentUser({ Balance: Number(user()?.Balance) + Number(amount()) });
          }
          setTimeout(startCheck, 1000);
        }

      }


    })
  }
  async function checkPay(pay_id: string) {
    const checkPayResponse = await fetch("https://api.smsvibe.ru/api/user/checkPay?token=" + user().Token + "&operation_id=" + pay_id)
    return await checkPayResponse.json()
  }

  async function doneTyping(e: any) {
    setAmount(e.target.value);

    if (amount().trim().length === 0) {
      return;
    }

    const errorMsg = {
      notNumeric: "Допустимы только цифры!",
      overLimit:
        "За один раз можно пополнить баланс не более чем 60 000 рублей.",
      underLimit: "Пополнение должно быть не менее 50 рублей!",
    };

    function isNumeric(str: any) {

      if (typeof str !== "string") return false;
      //@ts-ignore
      return !isNaN(str) && !isNaN(parseFloat(str));
    }

    if (isNumeric(amount())) {
      if (amount() > 60000) {
        return ShowToast(errorMsg.overLimit, "error");
      } else if (amount() < 50) {
        return ShowToast(errorMsg.underLimit, "error");
      }
    } else {
      if (amount() === "dev") {
        setAmount("1");
      } else {
        return ShowToast(errorMsg.notNumeric, "error");
      }
    }

    await showPayForm()
  }

  async function showPayForm() {
    showLoading()

    const confirmation_token = await getConfirmationToken(amount())
    setConfToken(confirmation_token)
    renderPayForm(confirmation_token)

    setAmountLabel(amount());
    checkIframeLoading();
  }

  async function getConfirmationToken(amount: any) {

    amount = amount ? amount : ""

    const response = await fetch(
      "https://api.smsvibe.ru/api/user/getPayInfo?amount=" + amount + "&token=" + user()?.Token
    );
    return await response.text();
  }

  return (
    <>
      <Title>{t.title.pay}</Title>
      <Meta name="description" content={t.description.pay} />
      <main class="m-auto max-w-lg select-none">
        <Toast />

        <h1 class="text-4xl sm:text-6xl sm:mb-10 pl-5 mt-5 sm:pl-0">
          Пополнение баланса
        </h1>
        <div
          id="pay_main_block"
          class="rounded-3xl shadow-xl p-5 sm:border min-h-[613px]"
        >
          <Show when={isPayComplete()}>
            <div class="text-xl mt-8 mb-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="151" height="151" class="m-auto mb-8" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="25" style="fill:#25ae88" />
                <path d="M38 15 22 33l-10-8" style="fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10" />
              </svg>
              <p class="text-2xl">Отлично! Баланс успешно пополнен</p>
              <p class="text-center text-sm font-medium mt-4">Теперь перейдите к выбору номеров: <a class="text-blue-600 underline" href="/">Перейти</a></p>
            </div>

          </Show>
          <Show when={!isPayComplete()}>
            <div class="mb-5">
              <div class="">
                <label for="sum" class="block text-md font-medium mb-2">
                  Введите сумму пополнения баланса:
                  <span class="block text-gray-400 text-xs mb-4">Минимум 50 ₽</span>
                </label>
                <div class="relative">
                  <input
                    type="text"
                    onKeyUp={handleKeyUp}
                    onKeyDown={handleKeyDown}
                    class="rounded-3xl py-4 px-4 pl-9 pr-16 block w-full border-gray-300 text-sm border border-l"
                    placeholder="50"
                  />
                  <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                    <span class="text-gray-500">₽</span>
                  </div>
                  <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                    <span class="text-gray-500">RUB</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative min-h-[224px]">
              <Show when={isLoading()}>
                <div class="z-10 absolute bg-white h-full w-full pt-4">
                  <div class="text-center">
                    <svg
                      class="animate-spin w-10 h-10 text-teal-600 m-auto mb-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <p class="font-medium">{loadingLabel()}</p>
                  </div>
                </div>
              </Show>

              <p class="text-4xl text-center">Сумма: {amountLabel()} ₽</p>
              <p class="text-center mb-5 text-gray-600">
                Выберите способ оплаты ниже
              </p>
              <div id="payment-form" class="min-h-[373px]"></div>
            </div>

          </Show>
        </div>
      </main>
    </>
  );
}
