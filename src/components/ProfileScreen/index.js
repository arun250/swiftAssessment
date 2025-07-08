import React, { Component } from 'react'
import { MoveLeft } from 'lucide-react';
import Loader from 'react-loader-spinner'
import {useNavigate} from "react-router-dom"
import "./index.css"
import { UserContext } from '../../context/UserContext';

class ProfileScreen extends Component {
static contextType = UserContext
  state = {
    userData: {},
    firstUser:[]
  }
  onClickBackArrow = () => {
    const { navigate } = this.props
    navigate("/comments")
}

componentDidMount() {
 this.getUserData()  
}

  getUserData = async () => {
    const apiUrl = "https://jsonplaceholder.typicode.com/users"
    
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        address: {
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city,
          zipcode: user.address.zipcode,
          geo: {
            lat: user.address.geo.lat,
            lng: user.address.geo.lng
          },
         },
        phone: user.phone,
        website: user.website,
        company: {
          name: user.company.name,
          catchPhrase: user.company.catchPhrase,
          bs: user.company.bs
        }

      }));
      console.log(updatedData)
      this.setState({ userData: updatedData, firstUser: updatedData[0] })
    
    
    }
  }

  renderProfileHeadingContainer = () => {
    const { firstUser } = this.state
    this.context.setUserName(firstUser.name);
    return (
      <div className='profileHeadingContainer'>
      <button className='arrow-button' onClick = {()=>this.onClickBackArrow()}>

      <MoveLeft color='#272a4b'/>
      </button>
        <h1 className='profileHeadingText'>Welcome, { firstUser.name}</h1>
</div>
  )
  }
  
  getInitials = (fullName) => {
    if (!fullName) return "";

  const names = fullName.trim().split(" ");
  const firstInitial = names[0]?.charAt(0).toUpperCase() || "";
  const lastInitial = names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : "";

  return firstInitial + lastInitial;
  }

  renderProfileCard = () => {
    const {firstUser } = this.state
  return (
    <div className='profileCard'>
      <h1 className='profileCardHeadingIcon'>{this.getInitials(firstUser.name)}</h1>
      <div className='userCard'>

        <p className='userName'>{firstUser.name }</p>
        <p className='userEmail'>{ firstUser.email}</p>
      </div>
</div>
)
}

  renderProfileDetails = () => {
    const { firstUser } = this.state
    const { address } = firstUser
    if (address === undefined) return null
    const { street, city, zipcode, suite, geo } = address
    const {lat, lng} = geo

  return (
    <>
      
      <div className='fetchedUserDataContainer'>
        
    <div className='profileDetails'>
      <p className='Userlabel'>User ID</p>
          <p className='userFetchedValue'>{ firstUser.id}</p>     
      </div>
      <div className='profileDetails'>
      <p className='Userlabel'>Name</p>
  <p className='userFetchedValue'>{ firstUser.name}</p>     
      </div>
      <div className='profileDetails'>
      <p className='Userlabel'>Email ID</p>
  <p className='userFetchedValue'>{ firstUser.email}</p>     
      </div>
      <div className='profileDetails'>
      <p className='Userlabel'>Address</p>
  <p className='userFetchedValue'>{`${suite}, ${street}, ${city}-${zipcode}, co-ordinates [${lat}, ${lng}]`}</p>     
      </div>
      <div className='profileDetails'>
      <p className='Userlabel'>Phone</p>
  <p className='userFetchedValue'>{ firstUser.phone}</p>     
      </div>
    </div>
       </>
)
}

  render() {

  
      return (
        <>
          <div className='bodyContainer'>
          {this.renderProfileHeadingContainer()}
          <div className='userProfileContainer'>
          {this.renderProfileCard()}
          {this.renderProfileDetails()}
          </div>
          </div>
        </>
    )
  }
}

export default ProfileScreen
