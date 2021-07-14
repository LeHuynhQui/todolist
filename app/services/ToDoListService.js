import { URL_API } from "../configs/constants.js"

export class ToDoListSerVice {
    constructor () {

    };

    callAPI = (slug, method, data) => {
        return axios ({
            url: `${URL_API}/${slug}`,
            method,
            data,
        })
    }
}