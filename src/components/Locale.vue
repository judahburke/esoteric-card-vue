<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n({ useScope: 'global' })
</script>

<template>
    <div class="select is-small">
        <select v-model="locale">
            <option value="en_US">English (U.S.)</option>
            <option value="vn_VN">Tiếng Việt (Việt Nam)</option>
            <option value="es_MX" disabled="true">Español (México)</option>
            <option value="de_DE" disabled="true">Deutsch (Deutschland)</option>
        </select>
    </div>
</template>