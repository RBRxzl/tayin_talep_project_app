import axios from 'axios';

export async function login(sicilNo, password) {
  const response = await axios.post('http://localhost:8080/api/auth/signin', {
    sicilNo,
    password,
  });
  return response.data;
}
