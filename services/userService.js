import axiosClient from "./AxiosClient";

const userService = {
    loginUser : (data) => axiosClient.post('user/login',data)
}

export default userService