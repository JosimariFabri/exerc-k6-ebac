import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class Products {
    list() {
        let response = http.get(`${Utils.getBaseUrl()}/public/getProducts`)
        check(response, { 'listagem de produtos deve retornar 200': (r) => r.status === 200 })
    }
}