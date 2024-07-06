import React , { useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import backgroundImage from '../../assets/images/signup.svg'; // Update the path as needed
import { Link } from "react-router-dom";


const SignUp = () => {

    const [email, setEmail] = useState('');
    const[userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const handleSignup = async () => {
      const data = {
          username: userName,
          email: email,
          password: password,
      };
  
      try {
          const response = await fetch("http://localhost:3000/signup", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
          });
  
          if (response.ok) {
              const result = await response.json();
              console.log('Signup successful:', result);
          } else {
              const errorData = await response.json();
              console.error('Signup failed:', errorData);
          }
      } catch (error) {
          console.error('Error during signup:', error);
      }
  
      console.log('Signup data:', { email, password, confirmPassword, termsAccepted, userName });
  };
  

    return (
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#f0f0f0',
          p: 3,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            backgroundColor: 'white',
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
          Create an account
          </Typography>
          <TextField
            label="username here"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="example@company.com"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
            }
            label="I agree to the terms and conditions"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignup}
            disabled={!email || !password || password !== confirmPassword || !termsAccepted}
            sx={{ mb: 2 }}
          >
            Sign Up
          </Button>
          <Typography variant="body2" align="center">
            Already have an account? <Link to="/signin">Login here</Link>
          </Typography>
        </Box>
      </Box>
    );
   
}

export default SignUp;