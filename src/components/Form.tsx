import styled from 'styled-components'

interface ActiveProps {
   active: boolean
}

const Form = styled.form`
   width: 100%;
   margin: 0 auto;
   display: flex;
   align-items: center;
   flex-direction: column;
   gap: 20px;
`

const Input = styled.input<ActiveProps>`
   all: unset;
   box-sizing: border-box;
   width: 100%;
   height: 56px;
   padding: 0 16px;
   display: flex;
   flex-direction: row;
   background: ${props => (props.active ? '#FFFFFF' : '#F2F2F2')};
   border: 1px solid rgba(0, 0, 0, 0.23);
   border-radius: 4px;
   font: normal 20px 'Work Sans';
   color: ${props => (props.active ? '#000000' : '#AFAFAF')};
   ${props => !props.active && 'pointer-events: none;'}
   &::placeholder {
      font: normal 500 16px/24px 'Work Sans';
      letter-spacing: 0.15px;
      color: rgba(0, 0, 0, 0.6);
   }
`

const Button = styled.button<ActiveProps>`
   all: unset;
   width: 100%;
   height: 48px;
   display: flex;
   justify-content: center;
   align-items: center;
   background: #1db954;
   border-radius: 4px;
   font: normal 16px/20px 'Work Sans';
   color: white;
   cursor: pointer;
   ${props => !props.active && 'pointer-events: none;'}
   ${props => !props.active && 'opacity: 0.7;'}
   img {
      width: 4.5vw;
      height: 2.5vh;
   }
`

const Buttons = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   gap: 25px;
   align-items: center;
   margin: 40px 0px 80px;
`

export { Form, Input, Button, Buttons }
