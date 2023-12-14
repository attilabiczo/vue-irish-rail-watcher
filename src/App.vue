<script setup lang="ts">
  import { ref, onUnmounted, provide, onErrorCaptured } from "vue";
  import TheHeader from "@/components/TheHeader.vue";
  import TheMainContent from "@/components/TheMainContent.vue"
  import { REFRESH_TOKEN_KEY, REFRESH_TIMEOUT } from "@/utils/constants"

  let intervalReference : ReturnType<typeof setInterval>;

  const refreshTokenId = ref<number>(Date.now());
  const hasError = ref<boolean>(false);

  function startRefreshService() {
    intervalReference = setInterval(function () {
      refreshTokenId.value = Date.now();
    }, REFRESH_TIMEOUT);
  }

  provide(REFRESH_TOKEN_KEY, refreshTokenId);

  onUnmounted(() => {
    if (intervalReference) {
      clearInterval(intervalReference);
    }
  })

  onErrorCaptured(() => {
    hasError.value = true;
  })
</script>

<template>
  <TheHeader />
  <Suspense @resolve="startRefreshService">
    <TheMainContent />
    <template #fallback>
      <div v-if="hasError" class="container">
        <div class="notification is-danger">
          Rail data cannot be loaded.
        </div>
      </div>
      <progress v-else class="progress is-small is-primary" max="100" />
    </template>
  </Suspense>
</template>

