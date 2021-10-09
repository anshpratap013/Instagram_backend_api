import logo from './logo.svg';
import './App.css';
import Post from './Post';
import React, {useState, useEffect } from "react";
import { db, auth } from './firebase';
import { Modal } from '@material-ui/core';
import { makeStyles }  from '@material-ui/core';
import { Button,Input }  from '@material-ui/core';
import ImageUpload from './ImageUpload';

function getModalStyle(){
  const top = 50;
  const left = 50;
  return {
    top: '${top}%',
    left: '${left}%',
    transform : 'translate(-${top}%, -${left}%',
  };
}
const useStyles = makeStyles((theme) =>(
  {
    paper:{
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #fff',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }
)); 
function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [OpenSignIn, setOpenSignIn] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  useEffect(() => { 
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        console.log(authUser);
        setUser(authUser);
      }else{
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  }, [user, username]); 
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc=> ({
        id: doc.id,
        post:doc.data()
      })));
    })
  },[]);
  
  const signup =(event) => {
    event.preventDefault();
    
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) =>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
    setOpen(false);
  }
  const signIn = (event) =>{
    event.preventDefault();
    
    auth
      .signInWithEmailAndPassword(email,password)
      .catch((error) => alert(error.message));
    setOpenSignIn(true);
  }
  
  return (
    <div className="App">
      <ImageUpload/>



      <Modal
        open ={open}
        onClose ={() => setOpen(false)}>
        
        <div style = {modalStyle} ClassName = {classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className = "app_headerImage"
                src= "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt = ""
              />
            </center>
            <Input
              placeholder = "username"
              type="text"
              value = {username}
              onChange={(e)=> setUsername(e.target.value)}
            />
            <Input
              placeholder = "email"
              type="text"
              value = {email}
              onChange={(e)=> setEmail(e.target.value)}
            />
            <Input
              placeholder = "password"
              type="text"
              value = {password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            <Button type = "submit" onClick={signup}>sign up</Button>
          </form>
          
          
        </div>
      </Modal>
      
      <Modal
        open ={OpenSignIn}
        onClose ={() => setOpenSignIn(false)}>
        
        <div style = {modalStyle} ClassName = {classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className = "app_headerImage"
                src= "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt = ""
              />
            </center>
            <Input
              placeholder = "email"
              type="text"
              value = {email}
              onChange={(e)=> setEmail(e.target.value)}
            />
            <Input
              placeholder = "password"
              type="text"
              value = {password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            <Button type = "submit" onClick={signIn}>Signin</Button>
          </form>          
        </div>
      </Modal>

    <div className = "app_header">
      <img 
        className = "app_headerImage"
        src= "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt = ""
      />
    </div> 
    {user ?(
      <Button onClick={() =>auth.signOut()}>logout</Button>
    ):(
      <div className = "app__loginContainer">
        <Button onClick={() =>setOpen(true)}>sign In</Button>
        <Button onClick={() =>setOpen(true)}>sign up</Button>
      </div>
    )}
    
    <h1>Hello clever programer's lets build instagram clone </h1>
    
    {
      posts.map(({id,post})=> (
        <Post key={id} username = {post.username} caption = {post.caption} imageUrl ={post.imageUrl}/>
      ))
    }
    
    </div>
  );
}

export default App;
