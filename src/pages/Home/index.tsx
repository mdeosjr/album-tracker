import { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { api } from '../../services/api'
import { apiToken } from '../../services/apiToken'
import { useNavigate } from 'react-router-dom'
import SideMenu from '../../components/SideMenu'
import MainPage from '../../components/MainPage'
import { Box } from '@mui/material'

function Home() {
   const { auth, setApiToken } = useAuth()
   let navigate = useNavigate()

   useEffect(() => {
      api.validateToken(auth!)
         .then(response => {
            apiToken().then(res =>
               res.json().then(data => setApiToken(data.access_token))
            )
         })
         .catch(err => {
            alert('Session expired, please log in again!')
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
