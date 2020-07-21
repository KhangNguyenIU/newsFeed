import React, { useContext } from 'react'
import { UserContext } from '../App'
import { Link, useHistory } from 'react-router-dom'
/**
* @author
* @function NavBar
**/

const NavBar = (props) => {
const history = useHistory()

  const { state, dispatch } = useContext(UserContext)
  const renderList = () => {
    if (state) {
      return [
        <>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/create">Creae Post</a></li>
          <li><Link to='/myfollowerspost'>My Following Posts</Link></li>
          <li>
            <button className="btn #c62828 red darken-3" 
            onClick={() =>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}>
              Log out
            </button>
          </li>
        </>
      ]
    } else {
      return [
        <>
          <li><a href="/signin">Sign In</a></li>
          <li><a href="/signup">Sign Up</a></li>
        </>
      ]
    }
  }


  return (

    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>

  )

}

export default NavBar