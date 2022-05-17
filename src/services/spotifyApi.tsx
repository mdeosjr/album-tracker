import axios from 'axios'

const BASE_URL = 'https://api.spotify.com/v1/search'

function createConfig(token: string) {
   return {
      headers: {
         Authorization: `Bearer ${token}`
      }
   }
}

async function getAlbum(token: string, albumName: string) {
    const config = createConfig(token)
    return axios.get(`${BASE_URL}?q=${albumName}&type=album`, config)
}

export const spotifyApi = {
    getAlbum
}