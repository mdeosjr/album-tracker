import styled from 'styled-components'

const Container = styled.div`
   width: 100%;
   height: 100%;
   padding: 20px;
`
const SearchBar = styled.form`
   position: relative;
`

const SearchField = styled.input`
   all: unset;
   box-sizing: border-box;
   width: 100%;
   height: 56px;
   padding: 0 16px;
   display: flex;
   flex-direction: row;
   background-color: '#FFFFFF';
   border: 1px solid rgba(255, 255, 255, 0.822);
   border-radius: 4px;
   font: normal 20px 'Work Sans';
   color: #ffffff;
   &::placeholder {
      font: normal 500 16px/24px 'Work Sans';
      letter-spacing: 0.15px;
      color: rgba(255, 255, 255, 0.849);
   }
`

export { Container, SearchField, SearchBar }
