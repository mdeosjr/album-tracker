import { useEffect, useState } from 'react'
import axios from 'axios'

export function apiToken() {
   const [token, setToken] = useState('')

   useEffect(() => {
      axios('https://accounts.spotify.com/api/token', {
         headers: {
            Authorization:
               'Basic ' +
               btoa(
                  import.meta.env.VITE_CLIENT_ID +
                     ':' +
                     import.meta.env.VITE_CLIENT_SECRET
               ),
            'content-type': 'application/x-www-form-urlencoded'
         },
         data: 'grant_type=client_credentials',
         method: 'POST'
      }).then((response) => setToken(response.data.access_token))
   }, [])

   return token
}
