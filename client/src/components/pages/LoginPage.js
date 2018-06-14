import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import LoginForm from '../forms/LoginForm';
import { logIn } from '../../actions';
import img from '../../static/images/gbeans.jpg';

class LoginPage extends Component {
    submit = (data) => (
     this.props.logIn(data, this.props.history)
    )
  render() {
    return (
            <div>
                <div className="top-nav">
                    <h2 className="logo">Book-A-Meal</h2>
                    <div className="right-nav">
                        <h2 className="nav-text"> <a href="#">About Us</a></h2>
                        <h2 className="nav-text"> <Link to="/login">Login</Link></h2>
                        <h2 className="nav-text"> <Link to="/signup">SignUp</Link></h2>
                    </div>
                </div>
                <div className="coverContainer">
                    <img className="coverImg" src={img} />
                </div>
                <div className="content contentBox">
                    <div className="info">
                        <h2 className="info-h">ALREADY HAVE AN ACCOUNT?</h2>
                        <p className="info-p">Use your email and password to login below</p>
                        <LoginForm submit={this.submit} {...this.props} />
                    </div>
                </div>

            </div>
    );
  }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    logIn: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    error: state.user.error,
    loading: state.user.loading
})
// mapstate for states, dispatch functions
export default connect(mapStateToProps, {logIn})(LoginPage);