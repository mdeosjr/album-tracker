import { OverallMenu, Logout, Logo } from './styles'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import { Typography } from '@mui/material'
import logo from '../../../favicon/logo.png'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

function SideMenu() {
   const { signOut, setReloadHome, reloadHome } = useAuth()
   let navigate = useNavigate()

   function logout() {
      localStorage.removeItem('API_TOKEN')
      signOut()
      navigate('/')
   }

   return (
      <OverallMenu>
         <Logo
            src={logo}
            onClick={() => {
               setReloadHome(!reloadHome)
            }}
         />
         <Logout>
            <Typography sx={{ color: 'white', fontFamily: 'Work Sans' }}>
               Logout
            </Typography>
            <ExitToAppRoundedIcon
               onClick={() => logout()}
               sx={{ color: 'white', cursor: 'pointer' }}
            />
         </Logout>
      </OverallMenu>
   )
}

export default SideMenu
