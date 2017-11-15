import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {createContainer} from 'meteor/react-meteor-data';
import {Ideas} from '../../../collections/ideas';

import './styles';

class CreateIdea extends Component {
    constructor(props){
        super(props)

        this.state = {
            title: '',
            description: '',
            picture: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // form field validations

        let errorMessage = "";
        let fieldLength = 0;

        fieldLength = this.refs.title.props.value.length;
        if (fieldLength === 0) {
            errorMessage += "Title cannot be blank.\n"
        } else if (fieldLength > 20) {
            errorMessage += "Title length cannot exceed 20 characters.\n"
        }

        fieldLength = this.refs.description.props.value.length;
        if (fieldLength === 0) {
            errorMessage += "Description cannot be blank.\n"
        } else if (fieldLength > 150) {
            errorMessage += "Description length cannot exceed 150 characters.\n"
        }

        if (this.refs.picture.files.length > 0) {
            if (this.refs.picture.files[0].size > 500000) {
                errorMessage += "Picture size cannot exceed 500 KB.\n"
            }
        }

        if (errorMessage.length > 0) {
            errorMessage += "\nPlease correct before submitting.\n"
            alert(errorMessage);
        } else {
            Meteor.call('ideas.insert', this.state)
            //console.log('id', this.props.ideas);
            // redirect to ideas page after submit
            this.props.history.push('/ideas');
        }
    }

    handleCancel = (event) => {
        event.preventDefault();

        this.props.history.push('/ideas');
    }

    render(){
        let loggedIn = false;
        let userId = this.props.currentUserId;

        if (userId !== null) {
            if (userId.length > 0) {
                loggedIn = true;
            }
        }

        return(
            <div className="outer-body">
                <div className="idea_form">
                    <div className="title">
                        Submit a post!
                    </div>
                    <br />

                    <form className="create_idea">
                        <div>
                            <TextField
                                hintText="Title"
                                errorText="This field is required"
                                type="text"
                                name="title"
                                ref="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <TextField
                                hintText="Description"
                                errorText="This field is required."
                                floatingLabelText="Enter idea description here"
                                multiLine={true}
                                rows={3}
                                name="description"
                                ref="description"
                                value={this.state.description}
                                onChange={this.handleChange}
                            />
                            <br />

                            <div className="add-visual">
                                <input type="file"
                                    name="picture"
                                    ref="picture"
                                    value={this.state.picture}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="submitIdea">
                                <RaisedButton
                                    label="Submit"
                                    secondary={true}
                                    onClick={this.handleSubmit}
                                    disabled={loggedIn ? false : true}
                                />
                                <RaisedButton
                                    label="Cancel"
                                    onClick={this.handleCancel}
                                    backgroundColor='#757575'
                                    labelColor='#ffffff'
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};

export default createContainer(() => {
    Meteor.subscribe('ideas');
    return {
        currentUser: Meteor.user(),
        currentUserId: Meteor.userId(), // b/c pulling it off above breaks if logged out
        ideas: Ideas.find({}).fetch()
    }
}, CreateIdea);
