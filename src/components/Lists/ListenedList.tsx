import { Card, CardContent, Box, Typography } from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import DeleteIcon from '@mui/icons-material/Delete'
import { styles } from '../GlobalStyles'
import { List } from '../MainPage'
import { api } from '../../services/api'
import useAuth from '../../hooks/useAuth'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ListProps {
   albums: List[]
}

function ListenedList({ albums }: ListProps) {
   const { auth, setReloadHome, reloadHome } = useAuth()

   function deleteAlbum(albumId: string) {
      api.deleteUserAlbum(auth, albumId)
         .then(() => {
            setReloadHome(!reloadHome)
            toast.success('Album deleted!', {
               position: 'top-right',
               autoClose: 1800,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: false,
               progress: undefined,
               theme: 'dark'
            })
         })
         .catch(e => {
            toast.error(`${e.response.data}`, {
               position: 'top-right',
               autoClose: 1800,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: false,
               progress: undefined,
               theme: 'dark'
            })
         })
   }

   return (
      <>
         <Box sx={styles.listContainer}>
            {albums.map(a => (
               <Card sx={styles.cardAlbum} key={a.albumId}>
                  <img width='80px' src={a.album.cover} alt='album info' />
                  <CardContent>
                     <Typography sx={styles.cardAlbumName}>
                        {a.album.name}
                     </Typography>
                     <Typography sx={styles.cardArtistName}>
                        {a.album.artist}
                     </Typography>
                  </CardContent>
                  <CheckRoundedIcon
                     sx={{
                        position: 'absolute',
                        bottom: '5px',
                        right: '5px',
                        color: '#1DB954'
                     }}
                  />
                  <DeleteIcon
                     sx={{
                        fontSize: '20px',
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        color: '#1DB954',
                        cursor: 'pointer'
                     }}
                     onClick={() => deleteAlbum(a.albumId)}
                  />
               </Card>
            ))}
         </Box>
         <ToastContainer />
      </>
   )
}

export default ListenedList
