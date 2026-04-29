import axiosClient from "./AxiosClient";
const noteService = {
    getNoteByMatricule : (id)=> axiosClient.get(`note/getNote/${id}`),
    postNote : (data) => axiosClient.post('note/create-note',data),
    getListeNotes : (data)=> axiosClient.post('/note/liste-note',data,{
        responseType:"blob"
    }),
    noteRepartition : ()=> axiosClient.get('/note/repartition-note'),
    getNotes: (data)=>axiosClient.post('/note/eleves/notes', data)
}
export default noteService