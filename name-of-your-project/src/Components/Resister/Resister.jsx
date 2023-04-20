import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {getAuth,createUserWithEmailAndPassword,sendEmailVerification,sendPasswordResetEmail,updateProfile, GoogleAuthProvider, signInWithPopup,GithubAuthProvider,FacebookAuthProvider } from "firebase/auth";
import app from '../../firebase/firebase';
import { Link } from 'react-router-dom';

const Resister = () => {
  const auth = getAuth(app);
  const resetemails=useRef('');
//google sign in
  function googlesign(){
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
      
      const user = result.user;
    
    }).catch((error) => {
      
      const errorMessage = error.message;
     
      // ...
    });
  
  }
  //github sign in
function githubsignin(){
  const provider = new GithubAuthProvider();

  signInWithPopup(auth, provider)
  .then((result) => {
    
    const user = result.user;
    
  }).catch((error) => {
   
    const errorMessage = error.message;
   
  });

}
//facebook log in
function fblogin(){
const provider = new FacebookAuthProvider();

signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });}
  //reset password
  function reset(){
    const email=resetemails.current.value;
    console.log(email);
    if(email){
      sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      });
    }
   
    }
    const[success,setSuccess]=useState('');
    const[error,setError]=useState('');
    const submit=(event)=>{
        event.preventDefault();
const email=event.target.email.value;

const password=event.target.password.value;
const name=event.target.name.value;

console.log(email,password,name);
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
createUserWithEmailAndPassword(auth, email, password,name)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    updatename(user,name);
    console.log(user);
    setError("");
    setSuccess("User has successfully submited it");
    event.target.reset();
    sendEmailVerification(userCredential.user)
  .then(() => {
    // Email verification sent!
    // ...
  });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorMessage);
    setSuccess('');
    // ..
  });
//   const resetmail=useRef('');

  
}
  const updatename=(user,name)=>{
    updateProfile(user, {
      displayName:name
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      setError(error.message);
      // An error occurred
      // ...
    });
    
  }
   
    return (
        <div className='d-flex justify-content-center my-3'>
        <div >
           <h4 className='text-center'>Resister</h4>
           <Form onSubmit={submit}>
           <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text"  placeholder="Your Name"name="name" required/>
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"ref={resetemails}  placeholder="Enter email"name="email" required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"name="password"required />
      </Form.Group><p >Forget your password?    <span onClick={reset} className='text-primary'>Reset</span>    </p>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Resister
      </Button>
      <p className='text-danger'>{error}</p>
      <p className='text-success'>{success}</p>
      <p>Do have a account <Link to="/Login">Sign in</Link></p>

    </Form>
    <div>
      <p>sign in by</p>
      <button onClick={googlesign} className='btn btn-outline-primary'>Google</button>
      <button onClick={githubsignin} className='btn btn-outline-success'>Github</button>
      <button onClick={fblogin} className='btn btn-outline-primary'>Facebook</button>

    </div>
        </div></div>
    );
};

export default Resister;