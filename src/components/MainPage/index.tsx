import { useState } from 'react'
import { Container, SearchField, SearchBar } from './styles'
import { styles } from '../GlobalStyles'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { spotifyApi } from '../../services/spotifyApi'

function MainPage() {
   const [album, setAlbum] = useState('')
   const [searchedAlbum, setSearchedAlbum] = useState<any[]>([])
   const token = localStorage.getItem('API_TOKEN')!
   console.log(searchedAlbum)

   function searchAlbum(albumName: string) {
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
         {searchedAlbum.map(album => (
            <img src={album.images[2].url} />
         ))}
      </Container>
   )
}

export default MainPage
