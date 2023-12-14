import { ref, onMounted } from 'vue'
import { FAVOURITE_STATIONS_STORAGE_KEY } from "@/utils/constants"
import { removeItemFromArray } from "@/utils/utilities";

export default function useFavouriteStations() {
    const favouriteStations = ref<string[]>([]);

    function getFavourites() {
        return window.localStorage.getItem(FAVOURITE_STATIONS_STORAGE_KEY) || '[]';
    }

    function setFavourites() {
        window.localStorage.setItem(FAVOURITE_STATIONS_STORAGE_KEY, JSON.stringify(favouriteStations.value));
    }

    function removeFavouriteStation(station: string) {
        favouriteStations.value = removeItemFromArray(favouriteStations.value, station);
        setFavourites();
    }

    function addFavouriteStation(station: string) {
        favouriteStations.value.push(station);
        setFavourites();
    }

    onMounted(() => {
        favouriteStations.value = JSON.parse(getFavourites()) || [];
    })

    return {
        favouriteStations,
        addFavouriteStation,
        removeFavouriteStation
    }
}