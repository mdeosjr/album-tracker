import { Box, Typography } from '@mui/material'
import { Container } from '../../components/MainPage/styles'
import SideMenu from '../../components/SideMenu'
import { styles } from '../../components/GlobalStyles'

function AboutPage() {
   return (
      <Box
         sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'row'
         }}
      >
         <SideMenu />
         <Container>
            <Typography sx={styles.tableTitle}>ABOUT Album Tracker</Typography>
            <Typography
               sx={{
                  ...styles.cardAlbumName,
                  width: '40vw',
                  marginBottom: '3vh'
               }}
            >
               Album Tracker is a website made thinking about people who loves
               music and keeping record of albums that you listened, are
               listening and the ones you want to listen. Under development.
            </Typography>
            <Typography
               sx={{
                  ...styles.cardAlbumName,
                  width: '40vw',
                  marginBottom: '3vh'
               }}
            >
               Search for an album. Click on the album that you want to add in
               one of your lists. Select the list! Now you are ready to go!
            </Typography>
            <Typography
               sx={{
                  ...styles.cardAlbumName,
                  width: '40vw',
                  marginBottom: '3vh'
               }}
            >
               All data to this application is provided by the Spotify API, go
               check out!
            </Typography>
            <Typography
               sx={{
                  ...styles.cardAlbumName,
                  width: '40vw',
                  marginBottom: '3vh'
               }}
            >
               Any bugs, improvements, suggestions or doubts, you can contact me
               on Github or e-mail
            </Typography>
            <Typography sx={styles.cardAlbumName}>
               <a href='mailto:mdeosjr@gmail.com'>
                  <Typography
                     sx={{
                        ...styles.cardAlbumName,
                        textDecoration: 'none'
                     }}
                  >
                     Gmail
                  </Typography>
               </a>
               <br />
               <a href='https://github.com/mdeosjr'>
                  <Typography
                     sx={{
                        ...styles.cardAlbumName,
                        textDecoration: 'none'
                     }}
                  >
                     Github
                  </Typography>
               </a>
            </Typography>
         </Container>
      </Box>
   )
}

export default AboutPage
