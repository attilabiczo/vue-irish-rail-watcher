import StationCard from "@/components/StationCard.vue";
import StationCardMessage from "@/components/StationCardMessage.vue";

export const customComponents = {
    install: (app: any) => {
        app.component(StationCard.name, StationCard);
        app.component(StationCardMessage.name, StationCardMessage);
    }
}