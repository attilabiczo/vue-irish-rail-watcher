import axios from "axios";
import type { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "https://justcors.com/l_1ve8kxkto7/api.irishrail.ie/realtime/realtime.asmx"
});

export default apiClient;
