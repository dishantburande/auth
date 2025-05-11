import React, { useState } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { authenticateLogin, authenticateSignup } from "../service/api.js";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > Button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  border-radius: 2px;
  height: 48px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  border-radius: 2px;
  height: 48px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
  color: #878787;
`;

const ERROR = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues ={
  email: 'email',
  password: 'password'
}

const signupInitialValues = {
  name: "name",
  email: "email",
  password: "password",
};


export const Login = () => {
  const [account, setAcount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState(false);
  const[login, setLogin] = useState(loginInitialValues)

  const toggleSighup = () => {
    account === "signup" ? setAcount("login") : setAcount("signup");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await authenticateSignup(signup);
    if (!response) {
      // setError("");
      // setSignup(signupInitialValues);
      // setAcount("login");
      return;
      // } else {
      //   setError("Something went wrong please try again later");
    }
  };

  const loginUser = async()=>{
    let response = await authenticateLogin(login)
    if(response){
      setError('')

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAcount({ name: response.data.name, email: response.data.email });
    }else {
            setError('Something went wrong! please try again later');
        }
  }

  const onValueCahnge = async ()=>{
    let response = await authenticateLogin(login);
        if(!response) 
            setError(true);
        else {
            setError(false);
            
        }
  }

  return (
    <Component>
      <Box>
        <h1 style={{ paddingTop: 50 }}>
          {account === "signup" ? "Registation" : "Login"}
        </h1>

        {account === "login" ? (
          <Wrapper>
            <TextField variant="standard" value={login.email} onChange={(e)=> onValueCahnge(e)} name="email" label="Enter Email" />
            <TextField variant="standard" value={login.password} onChange={(e)=> onValueCahnge(e)} name="password" label="Enter Password" />
            {error && <ERROR>{error}</ERROR>}
            <LoginButton variant="contained" onClick={()=> loginUser()}>Login</LoginButton>
            <Text>OR</Text>
            <SignupButton onClick={() => toggleSighup()}>
              {" "}
              Create an Acount
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              name="name"
              label="Enter Name "
              onChange={(e) => onInputChange(e)}
            />
            <TextField
              variant="standard"
              name="email"
              label="Enter Email"
              onChange={(e) => onInputChange(e)}
            />
            <TextField
              variant="standard"
              label="Enter Password"
              name="password"
              onChange={(e) => onInputChange(e)}
            />
            {error && <ERROR>{error}</ERROR>}
            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSighup()}>
              Already have an Acount
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};
export default Login;
