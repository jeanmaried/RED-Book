import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Profiles } from '../../../collections/profiles';
import Profile from './Users';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';



class ProfileContainer extends Component {

  render() {
      let profileData = this.props.profiles;

      return (
          <Profile profileData={profileData} />
          
        
      );
  }
}



export default createContainer(() => {
  //setup subscription, pass in the publications name
  Meteor.subscribe('users'); //Whatever is available from the publication will be returned here
  //return an object, whatever that is returned will be available on props for this component
  return {
    profiles: Profiles.find({}).fetch()
  }; //We need to call fetch() that will invoke the cursor to actually execute the query
}, ProfileContainer);


{/* <div className="users-list">
{this.props.users.map(user => (
  <Profile key={user._id} user={user} />
))}
</div> */}