import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { DEFAULT_STATION_ID } from "@/utils/constants";
import useFavouriteStations from "@/composables/useFavouriteStations";
import useSelectedStations from "@/composables/useSelectedStations";
import { convertStations } from "@/utils/utilities";
import type { StationsType, StationCardEmitType } from "@/types";

export const useStationStore = defineStore("station", () => {
    const allStationsRaw = ref<string>("");
    const defaultStation = DEFAULT_STATION_ID;

    const { favouriteStations, addFavouriteStation, removeFavouriteStation } = useFavouriteStations();
    const { selectedStations, addSelectedStation, removeSelectedStation } = useSelectedStations();

    const allStations = computed<StationsType[]>(() => {
        const allStationsConverted: StationsType[] = convertStations(allStationsRaw.value);
        return allStationsConverted.sort((a, b) => (a.title > b.title) ? 1 : -1);
    })

    const visibleStations = computed<string[]>(() => {
        const stations: string[] = [...new Set([...favouriteStations.value, ...selectedStations.value])];
        return [DEFAULT_STATION_ID, ...stations.sort()];
    })

    function setAllStations(stations: string) {
        allStationsRaw.value = stations;
    }

    function toggleFavourite(toggleFavouriteInfo: StationCardEmitType) {
        if (toggleFavouriteInfo.isFavourite) {
            removeFavouriteStation(toggleFavouriteInfo.station);
        }
        else {
            addFavouriteStation(toggleFavouriteInfo.station);
        }
    }

    function removeStation(removeStationInfo: StationCardEmitType) {
        if (removeStationInfo.isFavourite) {
            removeFavouriteStation(removeStationInfo.station);
        }

        removeSelectedStation(removeStationInfo.station);
    }

    function addStation(station: string) {
        addSelectedStation(station)
    }

    return {
        allStations,
        setAllStations,

        defaultStation,
        selectedStations,
        favouriteStations,

        visibleStations,

        addStation,
        removeStation,

        toggleFavourite
    }
})