
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileScreen from './ProfileScreen';

const ProfileScreenWrapper = () => {
  const navigate = useNavigate();
  return <ProfileScreen navigate={navigate} />;
};

export default ProfileScreenWrapper;
