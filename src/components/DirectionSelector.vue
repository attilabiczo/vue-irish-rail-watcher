<script setup lang="ts">
  import { useDirectionStore } from '@/stores/direction';
  import { RAIL_LINE_DIRECTIONS } from "@/utils/constants";

  const directionStore = useDirectionStore();
</script>

<template>
  <div class="box control-box direction-selector-component">
    <p class="title">Directions</p>
    <ul>
      <li v-for="line in RAIL_LINE_DIRECTIONS" :key="line">
        <label class="checkbox">
          <input type="checkbox" :id="line" :value="line" v-model="directionStore.selectedDirections">
          {{ line }}
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.direction-selector-component {
  height: 150px;
}
</style>