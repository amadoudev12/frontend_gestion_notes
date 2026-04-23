import axiosClient from "./AxiosClient"

const affectationService = {
    getAffectations : ()=> axiosClient.get('/affectation/'),
    CreateAffectation : (data)=>axiosClient.post("/affectation/create",data)
}

export default affectationService