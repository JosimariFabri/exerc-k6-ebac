import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class Login {
    #token

    access(email, password) {
        let response = http.post(`${Utils.getBaseUrl()}/public/authUser`, JSON.stringify(
            {
                "username": email,
                "password": password
            }
        ), {
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        })
        this.#token = response.json('accessToken')
        check(response, {
            "status deve ser 200": (r) => r.status === 200
        });
    }

    getToken(){
        return this.#token
    }
}