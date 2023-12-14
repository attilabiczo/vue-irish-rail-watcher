import { ref } from "vue";
import { defineStore } from "pinia";

export const useDirectionStore = defineStore("direction", () => {

    const selectedDirections = ref<string[]>(["Southbound"]);

    return { selectedDirections }
})