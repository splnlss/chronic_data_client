import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import requiresLogin from '../../auth/components/requires-login';
import {fetchProtectedData} from '../../auth/actions/protected-data';
import './dashboard.css';

export class Dashboard extends React.Component {
  componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

  render() {
    let userNameUpperCase = this.props.username.toUpperCase()
    return (
      <Router>
        <div className="dashboard">
            <main>
              <div>
                <h2>WELCOME {userNameUpperCase}!</h2>
                <p>To add documents select documents button from toolbar above.</p>
              </div>
            </main>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
