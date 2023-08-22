<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
  <img width="144" src="/logo-light.png" v-if="colorMode.value === 'light'" />
  <img width="144" src="/logo-dark.png" v-if="colorMode.value === 'dark'" />
</template>
