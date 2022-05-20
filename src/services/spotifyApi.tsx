import axios from 'axios'

const BASE_URL = 'https://api.spotify.com/v1'

function createConfig(token: string) {
   return {
      headers: {
         Authorization: `Bearer ${token}`
      }
   }
}

async function getAlbum(token: string, albumName: string) {
   const config = createConfig(token)
   return axios.get(`${BASE_URL}/search?q=${albumName}&type=album`, config)
}

async function getAlbumTracks(token: string, albumId: string) {
   const config = createConfig(token)
   return axios.get(`${BASE_URL}/albums/${albumId}/tracks`, config)
}

export const spotifyApi = {
   getAlbum,
   getAlbumTracks
}
