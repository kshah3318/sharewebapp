import React , { useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, Link } from '@mui/material';
import backgroundImage from '../../assets/images/signup.svg'; // Update the path as needed


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const handleSignup = () => {
        // Handle the signup logic here
        console.log('Signup:', { email, password, confirmPassword, termsAccepted });
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
            Already have an account? <Link href="/signin">Login here</Link>
          </Typography>
        </Box>
      </Box>
    );
   
}

export default SignUp;