import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Posts from "./Posts";
import qs from 'qs'
import axios from "axios";
class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = { value: '' }
  }
  onPostClick = e => {
    e.preventDefault()
    axios({
      method: 'post',
      url: '/api/posts',
      data: qs.stringify({
        postedBy: this.props.auth.user.id,
        text: this.state.value
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(() => {
      this.setState({ value: '' })
      window.location.reload()
    })
  }

  handlePostChange = e => {
    e.preventDefault()
    this.setState({ value: e.target.value })
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    if (user.isVerified) {
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper"
          style={{
            marginTop: "2rem"
          }}
        >
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
              </h4>
              <div className="input-field col s12">
                <textarea id="textarea" className="materialize-textarea" value={this.state.value} onChange={this.handlePostChange} />
                <label for="textarea">Post something today!</label>
              </div>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "0.5rem"
                }}
                onClick={this.onPostClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Post
              </button>
              <Posts className="col s12 center-align" user={user}></Posts>
              <div className="col s12 center-align">
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button>
                {user.isVerified ? <h6>Validated user</h6> : <p>Please verify your email</p>}
                {user.lastLogin ? <h6>Last Login at - {Date(user.lastLogin).toLocaleString('en-IN', { timeZone: 'IST' })}</h6> : <></>}
              </div>
            </div>
          </div>
        </div>
      );
    } else { 
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper"
          style={{
            marginTop: "2rem"
          }}
        >
          <div className="row">
            <div className="col s12 center-align">
              <h4>Please Verify your email.</h4>
              <p className="flow-text grey-text text-darken-1">Note: Check your Spam folder.</p>
              <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button>
              </div>
              </div>
              </div>
      )
    }

  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);