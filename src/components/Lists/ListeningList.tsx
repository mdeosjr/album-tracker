import { Card, CardContent, Typography, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import useAuth from '../../hooks/useAuth'
import { api } from '../../services/api'
import { styles } from '../GlobalStyles'
import { List } from '../MainPage'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ListProps {
   albums: List[] | undefined
}

function ListeningList({ albums }: ListProps) {
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
            {albums?.map(a => (
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

export default ListeningList
