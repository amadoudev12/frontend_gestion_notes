import axiosClient from "./AxiosClient";
const classeService = {
    getListApi : (id)=> axiosClient.get(`classe/liste-classe/${id}`),
    getAllClasse : () => axiosClient.get(`classe/etablissement/classe/`),
    getClasseMatiere : (id) => axiosClient.get(`classe/classe-matiere/${id}`),
    postClasses : (data)=> axiosClient.post('/classe/create',data)
}

export default classeService