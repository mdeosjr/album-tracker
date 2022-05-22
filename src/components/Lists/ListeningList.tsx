import { Card, CardContent, Typography, Box } from '@mui/material'
import { styles } from '../GlobalStyles'
import { List } from '../MainPage'

interface ListProps {
   albums: List[] | undefined
}

function ListeningList({ albums }: ListProps) {
   return (
      <Box sx={styles.listContainer}>
         {albums?.map(a => (
            <Card
               sx={styles.cardAlbum}
               key={a.albumId}
            >
               <img width='80px' src={a.album.cover} alt='album info' />
               <CardContent>
                  <Typography
                     sx={styles.cardAlbumName}
                  >
                     {a.album.name}
                  </Typography>
                  <Typography
                     sx={styles.cardArtistName}
                  >
                     {a.album.artist}
                  </Typography>
               </CardContent>
            </Card>
         ))}
      </Box>
   )
}

export default ListeningList
