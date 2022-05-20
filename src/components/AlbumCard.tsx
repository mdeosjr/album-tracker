import * as React from 'react'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
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

export interface SimpleDialogProps {
   open: boolean
   selectedValue: string
   onClose: (value: string) => void
}

function SimpleDialog(props: SimpleDialogProps) {
   const { onClose, selectedValue, open } = props

   const handleClose = () => {
      onClose(selectedValue)
   }

   const handleListItemClick = (value: string) => {
      onClose(value)
      console.log(value)
   }

   return (
      <Dialog onClose={handleClose} open={open}>
         <DialogTitle>Select a list</DialogTitle>
         <List sx={{ pt: 0 }}>
            <ListItem
               button
               onClick={() => handleListItemClick('Listened')}
               key={'Listened'}
            >
               <ListItemText primary={'Listened'} />
            </ListItem>
            <ListItem
               button
               onClick={() => handleListItemClick('Listening')}
               key={'Listening'}
            >
               <ListItemText primary={'Listening'} />
            </ListItem>
            <ListItem
               button
               onClick={() => handleListItemClick('To Listen')}
               key={'To Listen'}
            >
               <ListItemText primary={'To Listen'} />
            </ListItem>
         </List>
      </Dialog>
   )
}

export default function AlbumCard({ album }: any) {
   const [open, setOpen] = React.useState(false)
   const [selectedValue, setSelectedValue] = React.useState('Listened')

   const handleClickOpen = () => {
      setOpen(true)
   }

   const handleClose = (value: string) => {
      setOpen(false)
      setSelectedValue(value)
      console.log(album.id)
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
         <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
         />
      </>
   )
}
