import { UserProfile } from "@clerk/nextjs";
// import React from 'react'

const ProfilePage = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex items-center justify-center">
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
