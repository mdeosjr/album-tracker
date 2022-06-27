import { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { api } from '../../services/api'
import { apiToken } from '../../services/apiToken'
import { useNavigate } from 'react-router-dom'
import SideMenu from '../../components/SideMenu'
import MainPage from '../../components/MainPage'
import { Box } from '@mui/material'
import { toast } from 'react-toastify'

function Home() {
   const { auth, getApiToken } = useAuth()
   let navigate = useNavigate()

   useEffect(() => {
      api.validateToken(auth!)
         .then(response => {
            apiToken().then(res =>
               res.json().then(data => getApiToken(data.access_token))
            )
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
         })
         .catch(err => {
            toast.warn('Session expired, please log in again', {
               position: 'top-right',
               autoClose: 1800,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: false,
               progress: undefined,
               theme: 'dark'
            })
            navigate('/')
         })
   }, [])

   return (
      <Box
         sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'row'
         }}
      >
         <SideMenu />
         <MainPage />
      </Box>
   )
}

export default Home
