import { data } from "react-router-dom";
import axiosClient from "./AxiosClient";
const etablissementService = {
    getEtablissement : (id) => axiosClient.get(`/etablissements/${id}`),
    postEtablissement : (data) => axiosClient.post('/etablissements/create', data)
}
export default etablissementService