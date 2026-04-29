import axiosClient from "./AxiosClient";


const enseignantService = {
    getEnseignants : ()=>axiosClient.get('/enseignants/etablissement'),
    getStat : () => axiosClient.get('enseignants/stat'),
    // recuperer les classes plus les matieres 
    getClassesApi : ()=> axiosClient.get('enseignants/classe-enseigner'),
    classeEffectif: ()=> axiosClient.get('/enseignants/nombre-eleves-classes'),
    postEnseignants : (data)=> axiosClient.post('/enseignants/create',data),
}

export default enseignantService