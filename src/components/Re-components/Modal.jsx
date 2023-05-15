import React from 'react';
import styled from 'styled-components';


const Background = styled.div`
width : 100vw;
height:100vh;
background-color:rgba(225,225,225,0.8);
position:fixed;
top:0;
left:0;
display:flex;
justify-content:center;
align-items:center;
z-index:50;
opcaity:40
`
const Content = styled.div`
background-color : white;
padding:20px;
border-radious:15px;
box-shadow:0 3px 15px -2px rgba(0,0,0,0.5);
position:relative;
max-width:60%;
`;
const Header = styled.div`
position:absolute;
top:5px;
right:19px;
font:bold

`;


function Modal({isOpen ,close,children,title}) {
 if(!isOpen) return null;

 return (
    <Background>
        <Content>
          <Header>
           
            <h1 onClick={close} style={{cursor:'pointer',font:"bold"}}>X</h1>
          </Header>

          {children}
        </Content>
      
    </Background>
  )
}

export default Modal
