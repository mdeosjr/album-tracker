import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Buttons, Button } from '../../components/Form'
import StyledLink from '../../components/StyledLink'
import { Box, Typography } from '@mui/material'
import { TailSpin } from 'react-loader-spinner'
import { styles } from '../../components/GlobalStyles'

function SignUp() {
   const [userData, setUserData] = useState({
      email: '',
      password: ''
   })
   const [passwordConfirm, setPasswordConfirm] = useState('')
   const [input, setInput] = useState(true)
   const [button, setButton] = useState(true)
   let navigate = useNavigate()

   function register(e: React.FormEvent) {
      e.preventDefault()

      if (passwordConfirm !== userData.password) {
         return alert('Password does not match')
      }

      setButton(false)
      setInput(false)
   }

   function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      setUserData({ ...userData, [e.target.name]: e.target.value })
   }

   function registerError() {
      setButton(true)
      setInput(true)
   }

   return (
      <Box sx={styles.container}>
         <Typography sx={styles.title} variant='h4' component='h1'>
            Get Started
         </Typography>
         <Form onSubmit={register}>
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
               placeholder='confirme your password'
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

export default SignUp
