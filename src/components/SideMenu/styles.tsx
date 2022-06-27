import styled from 'styled-components'

const OverallMenu = styled.div`
   position: relative;
   height: 100vh;
   width: 18vw;
   border-right: 1px solid white;
   padding: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
`

const Logout = styled.div`
   position: absolute;
   bottom: 20px;
   width: 100%;
   padding: 0 18px;
   display: flex;
   justify-content: space-between;
`

const Logo = styled.img`
   height: 50px;
   width: 50px;
   margin: 10px 0 20px;
   cursor: pointer;
`

export { OverallMenu, Logout, Logo }
