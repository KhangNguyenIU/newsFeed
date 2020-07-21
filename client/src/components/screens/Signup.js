import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
/**
* @author
* @function Signin
**/

const Signup = (props) => {
  const history = useHistory()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState(undefined)

useEffect(()=>{
  if(url){
    uploadFields()
  }
},[url])

  const uploadPic=()=>{
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', "insta-clone")
    data.append('cloud_name', "dmdiv5ldu")
    fetch("https://api.cloudinary.com/v1_1/dmdiv5ldu/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
   
      })
      .catch(err => {
        console.log(err);
      })
  }
  const uploadFields=()=>{
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: "Invalid Email ", classes: "#e57373 red lighten-2" })
      return
    }
    fetch('/signup', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic:url
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error })
        }
        else {
          M.toast({ html: data.msg })
          history.push('/signup')
        }
      })
  }
  const PostData = () => {
    if(image){
      uploadPic()
    }else{
      uploadFields()
    }
    
  }
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>INSTAGRAM</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="file-field input-field">
          <div className="btn">
            <span>Upload Avatar</span>
            <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button className="btn waves-effect waves-light" onClick={() => PostData()}>
          Sign Up
        </button>
        <h5>
          <Link to="/Signup" className="account-link">Already have an account?</Link>
        </h5>
      </div>
    </div>
  )

}

export default Signup