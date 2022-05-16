import { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { api } from '../../services/api'
import { apiToken } from '../../services/apiToken'
import { useNavigate } from 'react-router-dom'

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

   return <h1>Home Page</h1>
}

export default Home
