import axiosClient from "./AxiosClient";

const bulletinService = {
    getBulletinsByClasse : (id) => axiosClient.get(`/bulletin/${id}`,{
        responseType : "blob"
    }),
}

export default bulletinService