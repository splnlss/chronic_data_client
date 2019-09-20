import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {Link} from 'react-router-dom';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../../validators';

// import {Button, Form} from 'semantic-ui-react';

let styles = {
    marginTop: '15px'
  };

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("onSubmit", this.state);
        return this.props.dispatch(login(this.state.username, this.state.password))
            .catch((e) => { console.error("Caught an error:", e); })
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite" style={{color: 'red'}}>
                    {this.props.error}
                </div>
            );
        }
        return (
            <form
                className=""
                onSubmit={this.onSubmit}>
                {error}
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    
                    value={this.state.username}
                    onChange={this.handleInputChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    
                    value={this.state.password}
                    onChange={this.handleInputChange}
                />
{/* 
                <a class="dropbox-btn" href="http://localhost:8080/api/auth/dropbox">Dropbox</a> */}

                <button type="submit" className="button" tabIndex="0">
                    Log in
                </button>
                <button className="button" style={styles}><Link to="/register">Register</Link></button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
