import { createContext, useState } from 'react'

interface AuthContextInterface {
   auth: string | null
   apiToken: string | null
   reloadHome: boolean | null
   setReloadHome: React.Dispatch<React.SetStateAction<boolean | null>>
   getApiToken: (token: string) => void
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
   const [apiToken, setApiToken] = useState<string | null>(null)
   const [reloadHome, setReloadHome] = useState<boolean | null>(false)

   function signIn(token: string) {
      setAuth(token)
      localStorage.setItem('AUTH', token)
   }

   function signOut() {
      setAuth(null)
      localStorage.removeItem('AUTH')
      localStorage.removeItem('API_TOKEN')
   }

   function getApiToken(token: string) {
      setApiToken(token)
      localStorage.setItem('API_TOKEN', token)
   }

   return (
      <AuthContext.Provider
         value={{
            auth,
            getApiToken,
            apiToken,
            signIn,
            signOut,
            reloadHome,
            setReloadHome
         }}
      >
         {children}
      </AuthContext.Provider>
   )
}

export default AuthContext
