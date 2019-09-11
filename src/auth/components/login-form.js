import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {Link} from 'react-router-dom';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../../validators';

import {Button, Icon, Form} from 'semantic-ui-react';

let styles = {
    marginTop: '15px'
  };

export class LoginForm extends React.Component {  
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
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
            <Form
                className="login-form ui"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <label htmlFor="username">Username</label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    validate={[required, nonEmpty]}
                />
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    validate={[required, nonEmpty]}
                />
{/* 
                <a class="dropbox-btn" href="http://localhost:8080/api/auth/dropbox">Dropbox</a> */}

                <Button disabled={this.props.pristine || this.props.submitting} class="ui primary button" tabindex="0">
                    Log in
                </Button>
                <Button class="ui button" style={styles}><Link to="/register">Register</Link></Button>
            </Form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
