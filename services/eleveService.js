import axiosClient from "./AxiosClient"
const eleveService = {
    getEleve: (id)=> axiosClient.get(`eleves/${id}`),
    getMoyenneMat: (id) => axiosClient.get(`eleves/note-matiere/${id}`),
    getRang : (data)=> axiosClient.post('eleves/rang',data),
    postAbsence: (data) => axiosClient.post('/eleves/absence',data),
    getEleveBulletin: (data) => axiosClient.post('eleves/bulletin', data,{
        responseType:'blob'
    }),
}

export default eleveService