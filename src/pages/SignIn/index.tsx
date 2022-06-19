import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Buttons, Button } from '../../components/Form'
import { styles } from '../../components/GlobalStyles'
import StyledLink from '../../components/StyledLink'
import { Box, CircularProgress, Typography } from '@mui/material'
import useAuth from '../../hooks/useAuth'
import { api } from '../../services/api'
import { AxiosError } from 'axios'
import logo from '../../../favicon/logo.png'
import spotifyLogo from '../../assets/spotifyLogo.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export interface LoginData {
   email: string
   password: string
}

function SignIn() {
   const [userData, setUserData] = useState<LoginData>({
      email: '',
      password: ''
   })
   const [input, setInput] = useState(true)
   const [button, setButton] = useState(true)
   let navigate = useNavigate()
   const { signIn } = useAuth()
   const AUTH_URI = `https://accounts.spotify.com/authorize?client_id=${
      import.meta.env.VITE_CLIENT_ID
   }&response_type=code&redirect_uri=${
      import.meta.env.VITE_REDIRECT_URI
   }&scope=user-read-email`

   async function login(e: React.FormEvent) {
      e.preventDefault()

      try {
         setButton(false)
         setInput(false)
         const { data } = await api.login({ ...userData })
         loginSucess(data)
      } catch (e: Error | AxiosError | any) {
         toast.warn('User or password incorrect!', {
            position: 'top-right',
            autoClose: 1800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'dark'
         })
         setButton(true)
         setInput(true)
      }
   }

   function loginSucess(token: string) {
      signIn(token)
      navigate('/home')
   }

   function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      setUserData({ ...userData, [e.target.name]: e.target.value })
   }

   return (
      <Box sx={styles.container}>
         <Box sx={styles.logoContainer}>
            <img
               src={logo}
               alt='Album Tracker logo'
               width='400px'
               height='400px'
            />
         </Box>
         <Box
            sx={{
               width: '30vw',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center'
            }}
         >
            <Typography sx={styles.title} variant='h4' component='h1'>
               Welcome back!
            </Typography>
            <Form onSubmit={login}>
               <Input
                  required
                  active={input}
                  type='email'
                  placeholder='email'
                  name='email'
                  onChange={handleInput}
                  value={userData.email}
               />
               <Input
                  required
                  active={input}
                  type='password'
                  placeholder='password'
                  name='password'
                  onChange={handleInput}
                  value={userData.password}
               />
               <Buttons>
                  <Button type='submit' active={button}>
                     {button ? 'LOG IN' : <CircularProgress color='inherit' />}
                  </Button>
                  <Typography sx={styles.cardArtistName}>
                     - or continue with -
                  </Typography>
                  <Button
                     active={button}
                     onClick={e => {
                        e.preventDefault()
                        window.location.href = AUTH_URI
                     }}
                  >
                     <img src={spotifyLogo} alt='Spotify Logo' />
                  </Button>
               </Buttons>
            </Form>
            <StyledLink to='/sign-up'>Not registered?</StyledLink>
         </Box>
         <ToastContainer />
      </Box>
   )
}

export default SignIn
