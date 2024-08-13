import { group } from 'k6';
import Login from '../request/login.request';
import data from '../data/usuarios.json'
import User from '../request/user.request';
import Products from '../request/produtos.request';

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '5s', target: 50 },
    { duration: '10s', target: 10 },
    { duration: '5s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(99) < 1000']
  }
}

export default function () {

  let login = new Login()
  let user = new User()
  let products = new Products()

  group('login and get token', () => {
    login.access(data.usuarioOk.email, data.usuarioOk.password)
  })

  group('list products', () => {
    products.list()
  })

  group('list users', () => {
    user.list(login.getToken())
  })

}
