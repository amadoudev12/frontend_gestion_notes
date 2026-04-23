import { data } from "react-router-dom";
import axiosClient from "./AxiosClient";

const matiereService = {
    getMatieres : ()=> axiosClient.get('/matieres'),
    postMatiers : (data)=> axiosClient.post('/matieres/add', data),
    modMatieres : (id, data)=> axiosClient.put(`/matieres/update/${id}`, data)
}

export default matiereService