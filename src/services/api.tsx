import axios from 'axios'
import { LoginData } from '../pages/SignIn'
import { UserData } from '../pages/SignUp'

const BASE_URL = 'http://localhost:5000'
//const BASE_URL = 'https://album-tracker-api.herokuapp.com'

function createConfig(token: string | null) {
   return {
      headers: {
         Authorization: `Bearer ${token}`
      }
   }
}

async function createUser(user: UserData) {
   return axios.post(`${BASE_URL}/users/create`, user)
}

async function login(data: LoginData) {
   return axios.post(`${BASE_URL}/users/login`, data)
}

async function validateToken(token: string) {
   const config = createConfig(token)
   return axios.post(`${BASE_URL}/validate-token`, {}, config)
}

async function saveAlbum(token: string | null, albumData: any) {
   const config = createConfig(token)
   return axios.post(`${BASE_URL}/save-album`, albumData, config)
}

async function getUserAlbums(token: string | null) {
   const config = createConfig(token)
   return axios.get(`${BASE_URL}/get-albums`, config)
}

export const api = {
   createUser,
   login,
   validateToken,
   saveAlbum,
   getUserAlbums
}
