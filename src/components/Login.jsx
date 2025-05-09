import React, { useState } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex:1;
  flex-direction: column;
  & > div,& > Button, & > p {
  margin-top: 20px;
  }
`;

const LoginButton =styled(Button)`
  text-transform: none;
  background: #FB641B;
  border-radius: 2px;
  height: 48px;
`

const SignupButton =styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  border-radius: 2px;
  height: 48px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%)

`

const Text = styled(Typography)`
  color: #878787;
`

const signupInitialValues ={
  name: 'name',
  username: 'username',
  password: 'password'
}

export const Login = () => {
  const [ account, setAcount] = useState('login')
  const [signup, setSignup] = useState(signupInitialValues)


  const toggleSighup = ()=>{
    account === 'signup' ? setAcount('login') : setAcount('signup')


  } 

  const onInputChange =(e)=>{
    setSignup({...signup, [e.target.name]: e.target.value})
  }
  return (
    <Component>
      <Box>
        <h1 style={{ paddingTop: 50 }}>{account === 'signup' ? "Registation" : "Login"}</h1>

        {   account === 'login' ?
        <Wrapper>
          <TextField variant="standard" label='Enter Username' />
          <TextField variant="standard" label='Enter Password'/>
          <LoginButton variant="contained">Login</LoginButton>
          <Text>OR</Text>
          <SignupButton onClick={()=> toggleSighup()}> Create an Acount</SignupButton>
        </Wrapper>
      :

        <Wrapper>
          
          <TextField variant="standard" name="name" label='Enter Name ' onChange={(e)=> onInputChange(e)}/>
          <TextField variant="standard" name="username" label='Enter Username' onChange={(e)=> onInputChange(e)}/>
          <TextField variant="standard" label='Enter Password' name="password" onChange={(e)=> onInputChange(e)}/>
          <SignupButton>Login</SignupButton>
          <Text>OR</Text>
          <LoginButton variant="contained" onClick={()=> toggleSighup()}>Already have an Acount</LoginButton>
        </Wrapper>
}
      </Box>
    </Component>
  );
};
export default Login;
