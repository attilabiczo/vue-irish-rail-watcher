<script setup lang="ts">
  import { computed, inject, ref } from "vue";
  import { REFRESH_TOKEN_KEY } from "@/utils/constants"

  const refreshTokenId = ref<number>(inject<number>(REFRESH_TOKEN_KEY) || 0);

  const formattedRefreshTime = computed<string>(() => {
    const today = new Date(refreshTokenId.value);
    return today.toLocaleTimeString();
  })

  const formattedRefreshDate = computed<string>(() => {
    const today = new Date(refreshTokenId.value);
    return today.toLocaleDateString();
  })
</script>

<template>
  <header class="page-header">
    <section class="hero is-primary has-text-centered">
      <div class="hero-body">
        <p class="title">
          Irish Rail Watcher
        </p>
        <p class="subtitle">
          {{ formattedRefreshDate }}, last refresh: {{ formattedRefreshTime }}
        </p>
      </div>
    </section>
  </header>
</template>

<style scoped>
  .page-header {
    margin-bottom: 32px;
  }
</style>