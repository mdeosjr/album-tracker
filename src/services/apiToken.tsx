export async function apiToken() {
   const searchParams = new URLSearchParams()
   searchParams.append('grant_type', 'client_credentials')
   searchParams.append('client_id', `${import.meta.env.VITE_CLIENT_ID}`)
   searchParams.append('client_secret', `${import.meta.env.VITE_CLIENT_SECRET}`)
   const url = `https://accounts.spotify.com/api/token?${searchParams}`

   return fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      }
   })
}
