import axios from 'axios';
import { Config } from '../config/config';

class CrudLogin {

    selectOne(login, callback, callbackError) {
        axios.get(`${Config.login}/${login.id}`)
        .then(
            (response) => callback(response.data)
        )
        .catch(
            (error) => callbackError(error)
        )
    }

    selectAll(callback) {
        axios
        .get(`${Config.login}`)
        .then(
            response => {
                callback(response.data);
            }
        )
        .catch(
            error => console.log(error)
        )
    }

    add(login) {
        return axios
        .post(`${Config.login}`, login)
        
    }

    update(login) {
        return axios
        .put(`${Config.login}/${login.id}`, login)
        
    }

    delete(login) {
        return axios
        .delete(`${Config.login}/${login.id}`)
        
    }

}

export default CrudLogin;