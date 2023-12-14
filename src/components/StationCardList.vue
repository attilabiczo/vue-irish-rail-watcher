<script setup lang="ts">
  import { useStationStore } from "@/stores/station";
  import { useDirectionStore } from '@/stores/direction';
  import type { StationCardEmitType } from "@/types"

  const stationStore = useStationStore();
  const directionStore = useDirectionStore();

  function getFullName(stationId: string) {
    const thisStation = stationStore.allStations.find((station) => station.id === stationId);
    return thisStation ? thisStation.title : "";
  }

  function isFavourite(stationId: string) {
    return stationStore.favouriteStations.indexOf(stationId) > -1;
  }

  function onToggleFavourite(toggleFavouriteInfo: StationCardEmitType) {
    stationStore.toggleFavourite(toggleFavouriteInfo);
  }

  function onRemoveStation(removeStationInfo: StationCardEmitType) {
    stationStore.removeStation(removeStationInfo);
  }

</script>

<template>
  <div class="container is-fluid ">
    <div class="station-card-list columns is-multiline is-tablet">
      <irish-rail-watcher-station-card v-for="station in stationStore.visibleStations" :key="station"
                   :station-id="station"
                   :station-name="getFullName(station)"
                   :is-favourite="isFavourite(station)"
                   :directions="directionStore.selectedDirections"
                   @toggleFavourite="onToggleFavourite"
                   @removeStation="onRemoveStation"/>
    </div>
  </div>
</template>

<style scoped>
  .station-card-list {
    padding: 12px;
  }
</style>