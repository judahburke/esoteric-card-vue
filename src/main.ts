import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PromiseDialog } from 'vue3-promise-dialog'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import en_US from './assets/locales/en_US.json'
import vn_VN from './assets/locales/vn_VN.json'
// import es_MX from './assets/locales/es_MX.json'
// import de_DE from './assets/locales/de_DE.json'

type TextSchema = typeof en_US

const i18n = createI18n<[TextSchema], 'en_US' | 'vn_VN'>({
    allowComposition: true,
    locale: 'en_US',
    fallbackLocale: 'en_US',
    messages: { 
        en_US, 
        vn_VN
        // es_MX, 
        // de_DE 
    },
    // datetimeFormats: {

    // },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PromiseDialog)
app.use(i18n)

app.mount('#app')
