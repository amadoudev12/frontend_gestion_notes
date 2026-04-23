import axiosClient from "./AxiosClient";


const enseignantService = {
    getEnseignants : ()=>axiosClient.get('/enseignants/etablissement'),
    getStat : () => axiosClient.get('enseignants/stat'),
    getClassesApi : ()=> axiosClient.get('enseignants/classe-enseigner'),
    postEnseignants : (data)=> axiosClient.post('/enseignants/create',data)
}

export default enseignantService