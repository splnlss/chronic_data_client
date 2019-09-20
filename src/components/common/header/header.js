import React from 'react';
import {Link} from 'react-router-dom';
import './../../../containers/dashboard/dashboard'
import './header.css'
import logo from '../../../images/logo.svg';
import {connect} from 'react-redux';
import {clearAuth} from '../../../auth/actions/auth';
import {clearAuthToken} from '../../../local-storage';

export class Header extends React.Component {
  logOut() {
      this.props.dispatch(clearAuth());
      clearAuthToken();
  }

  render(){
    let headerMenu;

    if (this.props.loggedIn){
        headerMenu =(
          <ul className="header-links">
            <li><Link to="/Dashboard/SubmitDocument"><span className="headerPlus">+ </span>Add Document</Link></li>
            <li><Link to="/Dashboard/Documents"><span className="headerPlus">+ </span>Documents</Link></li>
            <li><Link to="/Dashboard/Vitals"><span className="headerPlus">+ </span>Add Vitals</Link></li>
            <li><Link to="/Dashboard/Contact"><span className="headerPlus">+ </span>Contact</Link></li>
            <li><a href="#" onClick={() => this.logOut()}><span className="headerPlus">+ </span>Log out</a></li>
          </ul>
        );
    }

    // if (!this.props.loggedIn){
    //     headerMenu =(
    //           <li><a href="#" onClick={() => this.logOut()}>+ Log In</a></li>
    //       )
    //     }

  return (
    <div>
      <header className="header">
        <Link to="/"><img src={logo} className="header-logo" alt="Chronic Data Logo" height="120"/></Link>
        <div className="title">
          <h1 className="header-title"><Link to="/">CHRONIC DATA SOCIETY</Link></h1>
          <p className="header-intro"> your data. your control. </p>
        </div>
        <nav>
            {headerMenu}
        </nav>
      </header>
    </div>
    )
  }
}

const mapStateToProps = state => ({
      loggedIn: state.auth.currentUser !== null
  });

export default connect(mapStateToProps)(Header);
