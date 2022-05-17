import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Buttons, Button } from '../../components/Form'
import { styles } from '../../components/GlobalStyles'
import StyledLink from '../../components/StyledLink'
import { Box, Typography } from '@mui/material'
import { TailSpin } from 'react-loader-spinner'
import useAuth from '../../hooks/useAuth'
import { api } from '../../services/api'
import { AxiosError } from 'axios'

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

   async function login(e: React.FormEvent) {
      e.preventDefault()

      try {
         const { data } = await api.login({ ...userData })
         setButton(false)
         setInput(false)
         loginSucess(data)
      } catch (e: Error | AxiosError | any) {
         alert(e)
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
         <Typography sx={styles.title} variant='h4' component='h1'>
            Log in
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
               <StyledLink to='/sign-up'>Not registered?</StyledLink>
               <Button type='submit' active={button}>
                  {button ? (
                     'LOG IN'
                  ) : (
                     <TailSpin
                        ariaLabel='loading-indicator'
                        color='#FFFFFF'
                        height={35}
                        width={35}
                     />
                  )}
               </Button>
            </Buttons>
         </Form>
      </Box>
   )
}

export default SignIn
