<script setup lang="ts">
  import { defineProps } from "vue";

  interface StationCardMessageProps {
    message: string
  }

  defineProps<StationCardMessageProps>()
</script>

<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
  export default {
    name: "irish-rail-watcher-station-card-message"
  }
</script>
