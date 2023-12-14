import { ref, computed } from 'vue'
import RailService from "@/services/RailService";
import { convertStation } from "@/utils/utilities";
import type { StationType } from "@/types";

export default function useStation(stationId: string) {
    const stationArrivalInfo = ref<StationType[]>([]);
    const isLoaded = ref<boolean>(false);
    const hasError = ref<boolean>(false);

    async function fetchStationData() {
        try {
            const stationDataRawXml = await RailService.getStationData(stationId);
            const stationData: StationType[] = convertStation(stationDataRawXml.data);

            stationArrivalInfo.value = stationData.sort((a, b) => a.dueIn - b.dueIn);

            hasError.value = false;
        }
        catch (e) {
            hasError.value = true;
        }
        finally {
            isLoaded.value = true;
        }
    }

    return {
        fetchStationData,
        stationArrivalInfo,
        hasError,
        isLoaded
    }
}