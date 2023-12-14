<script setup lang="ts">
  import { computed, ref, watch, inject, defineProps, defineEmits } from "vue";
  import { DEFAULT_STATION_ID, REFRESH_TOKEN_KEY, NUMBER_OF_ARRIVALS } from "@/utils/constants"
  import IrishRailWatcherStationCardMessage from "@/components/StationCardMessage.vue";
  import useStation from "@/composables/useStation";
  import type { StationCardProps, StationType } from "@/types";

  const props = defineProps<StationCardProps>()

  const emit = defineEmits<{
    toggleFavourite: [{ station: string, isFavourite: boolean }]
    removeStation: [{ station: string, isFavourite: boolean }]
  }>()

  const refreshTokenId = ref(inject<number>(REFRESH_TOKEN_KEY));

  const { fetchStationData, stationArrivalInfo, isLoaded, hasError } = useStation(props.stationId);

  const nextArrivals = computed(() => {
    return stationArrivalInfo.value
        .filter((station: StationType) => {
          return props.directions.indexOf(station.direction) > -1;
        })
        .slice(0, NUMBER_OF_ARRIVALS);
  });
  const noData = computed(() => nextArrivals.value.length === 0);
  const isDefaultStation = computed(() => props.stationId === DEFAULT_STATION_ID);

  function removeStation() {
    emit("removeStation", { station: props.stationId, isFavourite: props.isFavourite});
  }

  function toggleFavourite() {
    emit("toggleFavourite", { station: props.stationId, isFavourite: props.isFavourite});
  }

  watch(refreshTokenId, () => {
    fetchStationData();
  });

  fetchStationData();

</script>

<script lang="ts">
  export default {
    name: "irish-rail-watcher-station-card"
  }
</script>

<template>
  <div class="is-relative column is-one-third">
    <div class="box">
      <progress v-if="!isLoaded" class="progress is-small is-primary" max="100" />
      <template v-else>
        <h5 class="is-size-5">
          {{ stationName }}
          <span class="icon" :class="{ 'is-favourite': isFavourite }" v-if="!isDefaultStation" @click="toggleFavourite">
              <i class="far fa-heart" :class="{ 'far': !isFavourite, 'fas': isFavourite }"></i>
            </span>
        </h5>
        <div>
          <irish-rail-watcher-station-card-message v-if="noData && !hasError" message="There is no rail coming in.." />
          <irish-rail-watcher-station-card-message v-else-if="noData && hasError" message="No data found" />
          <table v-else class="table is-hoverable is-fullwidth">
            <tbody>
            <tr v-for="(arrival, idx) in nextArrivals" :key="idx">
              <td><span class="is-pulled-left">{{ idx + 1 }}</span></td>
              <td>{{ arrival.destination }} ({{ arrival.directionShort }})</td>
              <td><span class="is-pulled-right">{{ arrival.dueIn }}</span></td>
            </tr>
            </tbody>
          </table>
        </div>
      </template>
      <button class="delete remove-station-button" v-if="!isDefaultStation && isLoaded" @click="removeStation"></button>
    </div>
  </div>
</template>

<style scoped>

  .station-card .box {
    height: 100%;
  }

  .remove-station-button {
    cursor: pointer;
    position: absolute;
    top: 24px;
    right: 24px;
  }

  .icon {
    cursor: pointer;
  }

  .icon.is-favourite {
    color: red;
  }
</style>