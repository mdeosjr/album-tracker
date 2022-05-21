import { Typography } from '@mui/material'
import { styles } from '../GlobalStyles'
import { List } from '../MainPage'

interface ListProps {
   albums: List[] | undefined
}

function ToListenList({ albums }: ListProps) {
   return (
      <>
         {albums?.map(a => (
            <Typography sx={styles.tableTitle} key={a.albumId}>
               {a.album.name}
            </Typography>
         ))}
      </>
   )
}

export default ToListenList
