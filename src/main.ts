import { createApp } from "vue"
import { createPinia } from "pinia"
import { customComponents } from "@/plugins"
import App from "@/App.vue"

const pinia = createPinia();

const app = createApp(App)
    .use(pinia)
    .use(customComponents);

app.mount("#app");
