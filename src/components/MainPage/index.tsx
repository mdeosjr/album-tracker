import { useEffect, useState } from 'react'
import { Container, SearchField, SearchBar } from './styles'
import { styles } from '../GlobalStyles'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { spotifyApi } from '../../services/spotifyApi'
import { Box } from '@mui/system'
import { Typography, Grid } from '@mui/material'
import AlbumCard from '../AlbumCard'
import { ListenedList, ListeningList, ToListenList } from '../Lists/index'
import useAuth from '../../hooks/useAuth'
import { api } from '../../services/api'

export interface List {
   album: {
      artist: string
      list: string
      name: string
   }
   albumId: string
}

function MainPage() {
   const [searchedAlbum, setSearchedAlbum] = useState<any[]>([])
   const [userAlbums, setUserAlbums] = useState<List[]>([])
   const [searchAlbumName, setSearchAlbumName] = useState('')
   const { auth, apiToken, reloadHome } = useAuth()

   useEffect(() => {
      api.getUserAlbums(auth).then(res => {
         setUserAlbums(res.data)
         setSearchAlbumName('')
         setSearchedAlbum([])
      })
   }, [reloadHome])

   const listenedList = userAlbums.filter(a => a.album.list === 'LISTENED')
   const listeningList = userAlbums.filter(a => a.album.list === 'LISTENING')
   const toListenList = userAlbums.filter(a => a.album.list === 'TO_LISTEN')

   function getSearchedAlbum(albumName: string) {
      setSearchAlbumName(albumName)

      if (albumName === '') return setSearchedAlbum([])

      spotifyApi
         .getAlbum(apiToken, albumName)
         .then(res => setSearchedAlbum(res.data.albums.items))
   }

   return (
      <Container>
         <SearchBar>
            <SearchField
               type='text'
               placeholder='Search for an album...'
               onChange={e => getSearchedAlbum(e.target.value)}
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
                  <ListenedList albums={listenedList} />
               </Grid>
               <Grid item xs={4}>
                  <Typography
                     variant='h2'
                     component='h2'
                     sx={styles.tableTitle}
                  >
                     LISTENING
                  </Typography>
                  <ListeningList albums={listeningList} />
               </Grid>
               <Grid item xs={3.5}>
                  <Typography
                     variant='h2'
                     component='h2'
                     sx={styles.tableTitle}
                  >
                     TO LISTEN
                  </Typography>
                  <ToListenList albums={toListenList} />
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
                  <AlbumCard album={album} key={album.id} />
               ))}
            </Box>
         )}
      </Container>
   )
}

export default MainPage
