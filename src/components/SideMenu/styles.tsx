import styled from 'styled-components'

const OverallMenu = styled.div`
   height: 100vh;
   width: 350px;
   border-right: 1px solid white;
   padding: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
`

const Logout = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
`

const Logo = styled.img`
   height: 50px;
   width: 50px;
`

export { OverallMenu, Logout, Logo }
