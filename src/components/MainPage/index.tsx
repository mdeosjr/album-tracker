import { useEffect, useState } from 'react'
import { Container, SearchField, SearchBar } from './styles'
import { styles } from '../GlobalStyles'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ConfirmationDialogRaw from '../AlbumCard'
import { spotifyApi } from '../../services/spotifyApi'
import { Box } from '@mui/system'
import {
   Card,
   CardActionArea,
   CardContent,
   CardMedia,
   Typography,
   Grid,
} from '@mui/material'
import AlbumCard from '../AlbumCard'

function MainPage() {
   const [searchAlbumName, setSearchAlbumName] = useState('')
   const [searchedAlbum, setSearchedAlbum] = useState<any[]>([])
   const token = localStorage.getItem('API_TOKEN')!
   console.log(searchedAlbum)

   function getAlbumId(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter') {
         e.preventDefault()
         if (!searchAlbumName) return setSearchedAlbum([])

         spotifyApi
            .getAlbum(token, searchAlbumName)
            .then(res => setSearchedAlbum(res.data.albums.items))
      }
   }

   function getTracks(albumId: string) {
      spotifyApi.getAlbumTracks(token, albumId).then(res => console.log(res))
   }

   return (
      <Container>
         <SearchBar>
            <SearchField
               type='text'
               placeholder='Search for an album...'
               onChange={e => setSearchAlbumName(e.target.value)}
               onKeyDown={e => getAlbumId(e)}
               value={searchAlbumName}
            />
            <SearchRoundedIcon type='image' sx={styles.searchIcon} />
         </SearchBar>
         {searchedAlbum.length === 0 ? (
            <Grid
               container
               sx={{
                  paddingTop: '40px',
                  height: '90vh',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '0.5vw'
               }}
            >
               <Grid item xs={3.5}>
                  <Typography
                     variant='h2'
                     component='h2'
                     sx={styles.tableTitle}
                  >
                     LISTENED
                  </Typography>
               </Grid>
               <Grid item xs={4}>
                  <Typography
                     variant='h2'
                     component='h2'
                     sx={styles.tableTitle}
                  >
                     LISTENING
                  </Typography>
               </Grid>
               <Grid item xs={3.5}>
                  <Typography
                     variant='h2'
                     component='h2'
                     sx={styles.tableTitle}
                  >
                     TO LISTEN
                  </Typography>
               </Grid>
            </Grid>
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
                  <AlbumCard album={album} key={album.id}/>
               ))}
            </Box>
         )}
      </Container>
   )
}

export default MainPage
