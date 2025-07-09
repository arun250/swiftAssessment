import React, { Component } from 'react'
import { MoveLeft } from 'lucide-react';
import { BeatLoader } from 'react-spinners';

import "./index.css"
import { UserContext } from '../../context/UserContext';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileScreen extends Component {
static contextType = UserContext
  state = {
    userData: {},
    firstUser: [],
    apiStatus:apiStatusConstants.initial
  }
  onClickBackArrow = () => {
    const { navigate } = this.props
    navigate("/comments")
}

componentDidMount() {
 this.getUserData()  
}

getUserData = async () => {
  this.setState({ apiStatus: apiStatusConstants.inProgress });

  const apiUrl = "https://jsonplaceholder.typicode.com/users";
  
  try {
    const response = await fetch(apiUrl);
    
    if (response.ok) {
      const fetchedData = await response.json();

      const updatedData = fetchedData.map(user => ({
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
            lng: user.address.geo.lng,
          },
        },
        phone: user.phone,
        website: user.website,
        company: {
          name: user.company.name,
          catchPhrase: user.company.catchPhrase,
          bs: user.company.bs,
        },
      }));

      const firstUser = updatedData[0];
      const { setUserName } = this.context;

      this.setState({
        userData: updatedData,
        firstUser: firstUser,
        apiStatus: apiStatusConstants.success,
      }, () => {
        setUserName(firstUser.name)
      });

    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    this.setState({ apiStatus: apiStatusConstants.failure });
  }
}


  renderLoadingView = () => (
    <div className="products-loader-container">
      <BeatLoader color="#36d7b7" loading={true} size={20} />
    </div>
  )

  renderFailureView = () => (
    <img
      src="https://res.cloudinary.com/diejm0elz/image/upload/v1749180642/Group_7519_izkpro.png"
      alt="failure View"
      
    />
  )


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
  
  renderSwitchCases() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <>
       {this.renderProfileHeadingContainer()}
          <div className='userProfileContainer'>
          {this.renderProfileCard()}
          {this.renderProfileDetails()}
          </div>
          </>
        )
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

render() {

      return (
        <>
          <div className='bodyContainer'>
          {this.renderSwitchCases()}
          </div>
        </>
    )
  }
}

export default ProfileScreen
