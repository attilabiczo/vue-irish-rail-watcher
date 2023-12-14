import http from "@/httpClient";

class RailService {
    getStationData(stationId: string): Promise<any> {
        return http.get(`getStationDataByCodeXML?StationCode=${stationId}`);
    }

    getAllStations(): Promise<any> {
        return http.get("getAllStationsXML");
    }
}

export default new RailService();
