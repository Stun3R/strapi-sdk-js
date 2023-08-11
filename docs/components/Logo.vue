<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
  <img
    width="144"
    src="/img/logo-light.png"
    v-if="colorMode.value === 'light'"
  />
  <img width="144" src="/img/logo-dark.png" v-if="colorMode.value === 'dark'" />
</template>
