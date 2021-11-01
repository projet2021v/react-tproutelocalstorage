import axios from "axios";
import { Config } from "../config/config";

class CrudContact {

    selectOne(contact, callback, callbackError) {
        axios
        .get(`${Config.contacts}/${contact.id}`)
        .then(
            response => callback(response.data)
        )
        .catch(
            error => callbackError(error)
        );
    }

    selectAll(callback) {
        axios
        .get(`${Config.contacts}`)
        .then(
            response => callback(response.data)
        )
        .catch(
            error => console.log(error)
        );
    }

    add(contact) {
        return axios
        .post(`${Config.contacts}`, contact);
    }

    update(contact) {
        return axios
        .put(`${Config.contacts}/${contact.id}`, contact);
    }

    delete(contact) {
        return axios
        .delete(`${Config.contacts}/${contact.id}`)
    }

}

export default CrudContact;