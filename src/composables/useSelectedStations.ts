import { ref } from 'vue'
import { removeItemFromArray } from "@/utils/utilities";

export default function useSelectedStations() {
    const selectedStations = ref<string[]>([]);

    function addSelectedStation(station: string) {
        selectedStations.value.push(station)
    }

    function removeSelectedStation(station: string) {
        selectedStations.value = removeItemFromArray(selectedStations.value, station);
    }

    return {
        selectedStations,
        addSelectedStation,
        removeSelectedStation
    }
}