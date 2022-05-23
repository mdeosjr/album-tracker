import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Buttons, Button } from '../../components/Form'
import StyledLink from '../../components/StyledLink'
import { Box, Typography, CircularProgress } from '@mui/material'
import { styles } from '../../components/GlobalStyles'
import { api } from '../../services/api'
import { AxiosError } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import logo from '../../../favicon/logo.png'

export interface UserData {
   name: string
   email: string
   password: string
}

function SignUp() {
   const [userData, setUserData] = useState<UserData>({
      name: '',
      email: '',
      password: ''
   })
   const [passwordConfirm, setPasswordConfirm] = useState('')
   const [input, setInput] = useState(true)
   const [button, setButton] = useState(true)
   let navigate = useNavigate()

   async function register(e: React.FormEvent) {
      e.preventDefault()

      if (passwordConfirm !== userData.password) {
         return toast.warn('Password does not match', {
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

      try {
         setButton(false)
         setInput(false)
         await api.createUser({ ...userData })
         toast.success('User created!', {
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
      } catch (e: Error | AxiosError | any) {
         registerError(e)
      }
   }

   function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      setUserData({ ...userData, [e.target.name]: e.target.value })
   }

   function registerError(e: Error | AxiosError | any) {
      toast.warn(`${e.response.data}`, {
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

   return (
      <Box sx={styles.container}>
         <Box
            sx={styles.logoContainer}
         >
            <img
               src={logo}
               alt='Album Tracker logo'
               width='400px'
               height='400px'
            />
         </Box>
         <Box sx={{ width: '30vw' }}>
            <Typography sx={styles.title} variant='h4' component='h1'>
               Get Started
            </Typography>
            <Form onSubmit={register}>
               <Input
                  required
                  active={input}
                  type='name'
                  placeholder='name'
                  name='name'
                  onChange={handleInput}
                  value={userData.name}
               />
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
               <Input
                  required
                  active={input}
                  type='password'
                  placeholder='confirm your password'
                  name='passwordConfirm'
                  onChange={e => setPasswordConfirm(e.target.value)}
                  value={passwordConfirm}
               />
               <Buttons>
                  <StyledLink to='/'>Have an account?</StyledLink>
                  <Button type='submit' active={button}>
                     {button ? (
                        'REGISTER'
                     ) : (
                        <CircularProgress color='inherit' />
                     )}
                  </Button>
               </Buttons>
            </Form>
         </Box>
         <ToastContainer />
      </Box>
   )
}

export default SignUp
