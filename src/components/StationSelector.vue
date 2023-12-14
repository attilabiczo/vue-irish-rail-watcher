<script setup lang="ts">
  import { computed, ref } from "vue";
  import { DEFAULT_STATION_ID } from "@/utils/constants"
  import { useStationStore } from "@/stores/station";

  const selectedStation = ref<string>('')

  const stationStore = useStationStore();

  const isAddButtonDisabled = computed<boolean>(() => {
    return selectedStation.value === '';
  })

  const selectableStations = computed(() => {
    return stationStore.allStations.filter((station) => {
      return station.id !== DEFAULT_STATION_ID
          && stationStore.selectedStations.indexOf(station.id) === -1
          && stationStore.favouriteStations.indexOf(station.id) === -1
    })
  })

  function addStation() {
    stationStore.addStation(selectedStation.value);
    selectedStation.value = "";
  }
</script>

<template>
  <div class="box control-box">
    <p class="title">Stations</p>
    <div class="is-flex">
      <div class="select">
        <select v-model="selectedStation">
          <option disabled value="">Please select a station</option>
          <option v-for="station in selectableStations" :key="station.id" :value="station.id">
            {{ station.title }}
          </option>
        </select>
      </div>
      <button class="button" @click.stop="addStation" :disabled="isAddButtonDisabled">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.control-box {
  height: 150px;
}

</style>
