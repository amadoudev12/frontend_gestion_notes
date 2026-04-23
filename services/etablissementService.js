import { data } from "react-router-dom";
import axiosClient from "./AxiosClient";
const etablissementService = {
    getEtablissement : (id) => axiosClient.get(`/etablissements/${id}`),
    postEtablissement : (data) => axiosClient.post('/etablissements/create', data),
    moyenneEvolution : ()=> axiosClient.get('/etablissements/moyenne-generale-evolution'),
    moyenneClasses : ()=> axiosClient.get('/etablissements/moyenne-classes'),
    moyenneMatieres : ()=> axiosClient.get('/etablissements/moyenne-matieres'),
}
export default etablissementService