<script setup lang="ts">
  import { useStationStore } from "@/stores/station";
  import DirectionSelector from "@/components/DirectionSelector.vue";
  import StationSelector from "@/components/StationSelector.vue";
  import StationCardList from "@/components/StationCardList.vue";
  import RailService from "@/services/RailService";

  const stationStore = useStationStore();

  const allStationsRawXml = await RailService.getAllStations();
  stationStore.setAllStations(allStationsRawXml.data);
</script>

<template>
  <main>
    <div class="container is-fluid">
      <div class="columns is-tablet">
        <div class="column">
          <DirectionSelector />
        </div>
        <div class="column">
          <StationSelector />
        </div>
      </div>
    </div>
    <StationCardList />
  </main>
</template>
