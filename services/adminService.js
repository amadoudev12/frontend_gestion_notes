import axiosClient from "./AxiosClient";
const adminService = {
    Stat : ()=> axiosClient.get('/admin/stat'),
    faiblesMoyenne : ()=>axiosClient.get('/admin/liste-faible-moyenne'),
    fortesMoyenne : ()=>axiosClient.get('/admin/liste-forte-moyenne'),
    classeBest : ()=> axiosClient.get('/admin/cinq-meilleurByclasse')

}
export default adminService