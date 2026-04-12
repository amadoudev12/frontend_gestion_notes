import axiosClient from "./AxiosClient";

const trimestreService = {
    getTrimestres : () => axiosClient.get('trimestres/'),
    postTrimestre : (data) => axiosClient.post('/trimestres/create',data),
    activeTrimestre : (id) => axiosClient.patch(`/trimestres/actif/${id}`)
}
export default trimestreService