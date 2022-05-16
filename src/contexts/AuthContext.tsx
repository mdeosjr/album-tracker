import { createContext, useState } from 'react'
import { apiToken } from '../services/apiToken'

interface AuthContextInterface {
   auth: string | null
   setApiToken: (token: string) => void
   signIn: (token: string) => void
   signOut: () => void
}

const AuthContext = createContext<AuthContextInterface | null>(null)

interface Props {
   children: React.ReactNode
}

const persistedAuth = localStorage.getItem('AUTH')

export function AuthProvider({ children }: Props) {
   const [auth, setAuth] = useState<string | null>(persistedAuth)

   function signIn(token: string) {
      setAuth(token)
      localStorage.setItem('AUTH', token)
   }

   function signOut() {
      setAuth(null)
      localStorage.removeItem('AUTH')
   }

   function setApiToken(token: string) {
      localStorage.setItem('API_TOKEN', token)
   }

   return (
      <AuthContext.Provider value={{ auth, setApiToken, signIn, signOut }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthContext
