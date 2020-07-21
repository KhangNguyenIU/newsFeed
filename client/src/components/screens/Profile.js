import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
/**
* @author
* @function Profile
**/

const Profile = (props) => {
  const { state, dispatch } = useContext(UserContext)
  const [myPics, setMypics] = useState([])
  const [image, setImage] = useState('')
  const [url, setUrl] = useState(undefined)
  useEffect(() => {
    fetch('/mypost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        setMypics(result.myposts)


      })
  }, [])

  useEffect(() => {
    if (image) {
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
          //console.log(data);

          //update database
          fetch('/updatepic', {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              pic: data.url
            })
          })
            .then(res => res.json())
            .then(result => {
              console.log(result);
              localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
              dispatch({ type: "UPDATEPIC", payload: result.pic })
              //window.location.reload()

            })
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [image])

  const UpdatePhoto = (file) => {
    setImage(file)

  }
  return (
    <div style={{ maxWidth: '720px', margin: '10px auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around'

      }}>
        <div style={{
          margin: '18px 0',
          borderBottom: '1px solid #eee'
        }}>
          <div >
            <img style={{ width: "160px", height: "160px", borderRadius: "50%" }}
              src={state ? state.pic : "loading"}
            />
          </div>

          <div className="file-field input-field" style={{ display: 'grid', maxWidth: '80%' }}>
            <div className="btn">
              <span>Upload Avatar</span>
              <input type="file" onChange={(e) => { UpdatePhoto(e.target.files[0]) }} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '1.5rem' }}>
          <h4>{state ? state.name : "loading"}</h4>
          <h5>{state ? state.email : "loading"}</h5>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '108%' }}>
            <h6>{myPics.length} Post</h6>
            <h6>{state ? state.followers.length : "0"} Followers</h6>
            <h6>{state ? state.following.length : "0"} Following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {
          myPics.map(item => {
            return (
              <img key={item._id} className="item" src={item.photo} alt={item.title} />
            )
          })
        }
      </div>

    </div>

  )

}

export default Profile