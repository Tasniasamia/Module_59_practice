import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {getAuth,signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase';
import { Link } from 'react-router-dom';

const Login = () => {
    
    const[success,setSuccess]=useState('');
    const[error,setError]=useState('');
    const submit=(event)=>{
        event.preventDefault();
const email=event.target.email.value;
const password=event.target.password.value;
if(!/(?=.*[a-z])/.test(password)){
    setError('should contain at least one lower case');
    return;
}
else if(!/(?=.*[A-Z])/.test(password)){
    setError('should contain at least one Upper case');
    return;
}
else if(password.length<8){
    setError('At least should contain 8 characters');
    return;
}
// else if(!/(?=.*[ -\/:-@\[-\`{-~]{1,})/.test(password)){
//     setError('should contain one special character');
//     return;
// }
signInWithEmailAndPassword (auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    setError("");
    setSuccess("User has successfully submited it");
    event.target.reset();
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorMessage);
    setSuccess('');
    // ..
  });


    }
    const auth = getAuth(app);

    return (
        <div className='d-flex justify-content-center my-3'>
        <div >
           <h4 className='text-center'>Login</h4>
           <Form onSubmit={submit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"name="email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"name="password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <p className='text-danger'>{error}</p>
      <p className='text-success'>{success}</p>
      <p>Do havn't a account <Link to="/Resister">Sign Up</Link></p>
    </Form>
        </div></div>
    );
};

export default Login;