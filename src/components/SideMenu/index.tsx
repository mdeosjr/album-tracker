import { OverallMenu, Logout, Logo } from './styles'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import {
   Typography,
   List,
   ListItem,
   ListItemButton,
   ListItemText
} from '@mui/material'
import logo from '../../../favicon/logo.png'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { styles } from '../../components/GlobalStyles'

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
               navigate('/home')
            }}
         />
         <Typography sx={{ font: 'bold 20px Work Sans', color: '#1DB954' }}>
            Album Tracker
         </Typography>
         <List sx={styles.sideMenuList}>
            <ListItem key={'profile'} disablePadding>
               <ListItemButton
                  sx={{
                     ':hover': {
                        backgroundColor: '#191414',
                        borderRadius: '4px'
                     }
                  }}
                  onClick={() => {
                     setReloadHome(!reloadHome)
                     navigate('/home')
                  }}
               >
                  <ListItemText
                     disableTypography
                     sx={{
                        font: '20px Work Sans',
                        color: '#1DB954',
                        letterSpacing: 1.5
                     }}
                     primary={'Profile'}
                  />
               </ListItemButton>
            </ListItem>
            <ListItem key={'friends'} disablePadding>
               <ListItemButton
                  sx={{
                     ':hover': {
                        backgroundColor: '#191414',
                        borderRadius: '4px'
                     }
                  }}
               >
                  <ListItemText
                     disableTypography
                     sx={{
                        font: '20px Work Sans',
                        color: '#1DB954',
                        letterSpacing: 1.5
                     }}
                     primary={'Friends'}
                  />
               </ListItemButton>
            </ListItem>
            <ListItem key={'receiptfy'} disablePadding>
               <ListItemButton
                  sx={{
                     ':hover': {
                        backgroundColor: '#191414',
                        borderRadius: '4px'
                     }
                  }}
                  onClick={() =>
                     window.open('https://receiptify.herokuapp.com/')
                  }
               >
                  <ListItemText
                     disableTypography
                     sx={{
                        font: '20px Work Sans',
                        color: '#1DB954',
                        letterSpacing: 1.5
                     }}
                     primary={'Receiptfy'}
                  />
               </ListItemButton>
            </ListItem>
            <ListItem key={'about'} disablePadding>
               <ListItemButton
                  sx={{
                     ':hover': {
                        backgroundColor: '#191414',
                        borderRadius: '4px'
                     }
                  }}
                  onClick={() =>
                     navigate('/about')
                  }
               >
                  <ListItemText
                     disableTypography
                     sx={{
                        font: '20px Work Sans',
                        color: '#1DB954',
                        letterSpacing: 1.5
                     }}
                     primary={'About'}
                  />
               </ListItemButton>
            </ListItem>
         </List>
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
