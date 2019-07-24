import React from 'react';
import {connect} from 'react-redux';
import { Route, Switch, withRouter} from 'react-router-dom';
import HeaderBar from './components/common/header/header';
import LandingPage from './containers/landingpage/landing-page';
import Dashboard from './containers/dashboard/dashboard';
import DocumentsForm from './components/documents/components/document-form';
import Vitals from './components/vitals/vitals';
import DocumentList from './components/documentViewer/components/documentList';
import DocumentViewer from './components/documentViewer/components/documentViewer';
import DocumentEdit from './components/documents/components/document-edit'
import Contact from "./containers/contact/contact";
import RegistrationPage from './auth/components/registration-page';
import FileViewer from './components/documentViewer/components/fileViewer';
import PDFViewer from './components/documentViewer/components/pdfViewer';
import PDFViewerTest from './components/documentViewer/components/pdfViewerTest';

import {refreshAuthToken} from './auth/actions/auth';

export class App extends React.Component {
    render() {
        return (
            <div className="app">
                <HeaderBar />
                <main>
                    <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route exact path="/Dashboard" component={Dashboard} />
                    <Route path="/Dashboard/SubmitDocument" component={DocumentsForm}/>
                    <Route path="/Dashboard/Vitals" component={Vitals}/>
                    <Route path="/Dashboard/Documents" component={DocumentList}/>
                    <Route path="/Dashboard/Contact" component={Contact}/>
                    <Route path="/register" component={RegistrationPage} />
                    <Route path="/documents/edit/:id" component={DocumentEdit} />
                    <Route path="/documents/:id" component={DocumentViewer} />
                    <Route path="/image/:id" component={PDFViewer} />
                    <Route path="/pdf/:id" component={PDFViewer} />
                    {/* <SecureRoute path="/profile" component={ProfilePage} /> */}
                    </Switch>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authToken: state.auth.authToken,
    currentUser: state.auth.currentUser
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));

// export default () => <div>the app</div>




