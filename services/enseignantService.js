import axiosClient from "./AxiosClient";


const enseignantService = {
    getStat : () => axiosClient.get('enseignants/stat'),
    getClassesApi : ()=> axiosClient.get('enseignants/classe-enseigner')
}

export default enseignantService