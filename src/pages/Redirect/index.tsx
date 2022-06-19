import { useEffect } from 'react'
import { api } from '../../services/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

function Redirect() {
   const urlParams = new URLSearchParams(window.location.search)
   const code = urlParams.get('code')
   let navigate = useNavigate()
   const { signIn } = useAuth()

   async function createSpotifyUser() {
      try {
         const { data } = await api.spotifyUser(code)
         signIn(data)
         toast.success('Welcome!', {
            position: 'top-right',
            autoClose: 1800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'dark'
         })
         navigate('/home')
      } catch (e) {
         toast.warn('Something went wrong, try again later', {
            position: 'top-right',
            autoClose: 1800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'dark'
         })
      }
   }

   useEffect(() => {
      createSpotifyUser()
   }, [])

   return <h1>Loading...</h1>
}

export default Redirect
