import http from 'k6/http';
import { check, group } from 'k6';

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

const USERNAME = 'admin@admin.com'; 
const PASSWORD = 'admin123';

const BASE_URL = 'http://lojaebac.ebaconline.art.br';


function setup() {
  const loginRes = http.post(`${BASE_URL}/public/authUser`, {
    username: USERNAME,
    password: PASSWORD,
  });

  const authToken = loginRes.json('access');
  check(authToken, { 'logged in successfully': () => authToken !== '' });

  return authToken;
}

export default function () {
  const authToken = setup()
  group('Listagem de clientes', () => {
    const res = http.get(`${BASE_URL}/api/getUsers`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    check(res, { 'voltar status 200': (r) => r.status === 200 });
  });

  group('listagem de produtos', () => {
    const response = http.get(`${BASE_URL}/public/getProducts`);
    check(response, { 'voltar status 200': (r) => r.status == 200})
    });


};