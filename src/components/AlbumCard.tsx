import { useState, useEffect } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import {
   Card,
   CardActionArea,
   CardContent,
   CardMedia,
   List,
   ListItem,
   ListItemText,
   Typography
} from '@mui/material'
import { spotifyApi } from '../services/spotifyApi'
import useAuth from '../hooks/useAuth'
import { api } from '../services/api'

export interface SimpleDialogProps {
   open: boolean
   onClose: (value: string) => void
}

function SimpleDialog(props: SimpleDialogProps) {
   const { onClose, open } = props

   const handleListItemClick = (value: string) => {
      onClose(value)
      console.log(value)
   }

   return (
      <Dialog onClose={onClose} open={open}>
         <DialogTitle sx={{ fontFamily: 'Work Sans' }}>
            Select a list
         </DialogTitle>
         <List>
            <ListItem
               button
               onClick={() => handleListItemClick('LISTENED')}
               key={'LISTENED'}
            >
               <ListItemText primary={'Listened'} />
            </ListItem>
            <ListItem
               button
               onClick={() => handleListItemClick('LISTENING')}
               key={'LISTENING'}
            >
               <ListItemText primary={'Listening'} />
            </ListItem>
            <ListItem
               button
               onClick={() => handleListItemClick('TO_LISTEN')}
               key={'TO_LISTEN'}
            >
               <ListItemText primary={'To Listen'} />
            </ListItem>
         </List>
      </Dialog>
   )
}

export default function AlbumCard({ album }: any) {
   const [open, setOpen] = useState(false)
   const { apiToken, auth } = useAuth()

   function getTracks(albumId: string, list: string) {
      spotifyApi
         .getAlbumTracks(apiToken, albumId)
         .then(res => {
            const albumData = {
               spotifyAlbumId: album.id,
               name: album.name,
               artist: album.artists[0].name,
               cover: album.images[0].url,
               url: album.external_urls.spotify,
               list,
               tracks: res.data.items.map(
                  (track: { id: string; name: string; external_urls: any }) => {
                     return {
                        spotifyTrackId: track.id,
                        name: track.name,
                        url: track.external_urls.spotify,
                        albumId: album.id
                     }
                  }
               )
            }

            api.saveAlbum(auth, albumData)
         })
         .catch(err => console.log(err))
   }

   const handleClickOpen = () => {
      setOpen(true)
   }

   const handleClose = (list: string) => {
      setOpen(false)
      getTracks(album.id, list)
   }

   return (
      <>
         <Card
            sx={{
               position: 'relative',
               maxWidth: 300,
               backgroundColor: 'black',
               ':hover': { border: '1px solid #1DB954' }
            }}
            key={album.id}
            onClick={handleClickOpen}
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
         <SimpleDialog open={open} onClose={handleClose} />
      </>
   )
}
