import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import ProfileCard from '../../components/ProfileCard';

const Profile = ({profileData, userVote, loginUserId}) => {
    return (
        <div className="appProfileContent">

                <div className="profileContainer">
                {profileData.map(user =>
                    <ProfileCard
                        key={user._id}
                        user={user}
                        userVote={userVote}
                        loginUserId={loginUserId}
                    />
                )}

              {/* {ideasData.map(idea =>
                    <ProfileCard key={idea._id} idea={idea} />  )} */}
                </div>

        </div>
    );

}

export default Profile;
