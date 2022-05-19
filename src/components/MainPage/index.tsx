import { useState } from 'react'
import { Container, SearchField, SearchBar } from './styles'
import { styles } from '../GlobalStyles'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { spotifyApi } from '../../services/spotifyApi'
import { Box } from '@mui/system'
import {
   Card,
   CardActionArea,
   CardContent,
   CardMedia,
   Typography
} from '@mui/material'

function MainPage() {
   const [album, setAlbum] = useState('')
   const [searchedAlbum, setSearchedAlbum] = useState<any[]>([])
   const token = localStorage.getItem('API_TOKEN')!
   console.log(searchedAlbum)

   function searchAlbum(albumName: string) {
      if (!albumName) return setSearchedAlbum([])
      spotifyApi
         .getAlbum(token, albumName)
         .then(res => setSearchedAlbum(res.data.albums.items))
   }

   return (
      <Container>
         <SearchBar>
            <SearchField
               type='text'
               placeholder='Search for an album...'
               onChange={e => setAlbum(e.target.value)}
               value={album}
            />
            <SearchRoundedIcon
               type='submit'
               sx={styles.searchIcon}
               onClick={() => searchAlbum(album)}
            />
         </SearchBar>
         {searchedAlbum.length === 0 ? (
            <Box
               sx={{
                  padding: '40px 0 20px',
                  height: '90vh',
                  display: 'flex',
                  justifyContent: 'space-between'
               }}
            >
               <Box
                  sx={{
                     width: '500px'
                  }}
               >
                  <Typography
                     variant='h2'
                     component='h2'
                     sx={styles.tableTitle}
                  >
                     LISTENED
                  </Typography>
               </Box>
               <Box sx={{ width: '500px' }}>
                  <Typography
                     variant='h2'
                     component='h2'
                     sx={styles.tableTitle}
                  >
                     LISTENING
                  </Typography>
               </Box>
               <Box sx={{ width: '500px' }}>
                  <Typography
                     variant='h2'
                     component='h2'
                     sx={styles.tableTitle}
                  >
                     TO LISTEN
                  </Typography>
               </Box>
            </Box>
         ) : (
            <Box
               sx={{
                  height: '100vh',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  padding: '20px 0 100px',
                  gap: '25px',
                  overflowY: 'scroll',
                  '::-webkit-scrollbar': {
                     display: 'none'
                  }
               }}
            >
               {searchedAlbum.map(album => (
                  <Card
                     sx={{
                        maxWidth: 300,
                        backgroundColor: 'black',
                        ':hover': { border: '1px solid #1DB954' }
                     }}
                     key={album.id}
                  >
                     <CardActionArea>
                        <CardMedia
                           component='img'
                           height='300'
                           image={album.images[1].url}
                           alt='album info'
                        />
                        <CardContent>
                           <Typography
                              gutterBottom
                              variant='h5'
                              component='div'
                              fontFamily='Work Sans'
                              color='#1DB954'
                           >
                              {album.name}
                           </Typography>
                           <Typography
                              variant='body2'
                              color='#1DB954'
                              fontFamily='Work Sans'
                           >
                              {album.artists[0].name}
                           </Typography>
                        </CardContent>
                     </CardActionArea>
                  </Card>
               ))}
            </Box>
         )}
      </Container>
   )
}

export default MainPage
