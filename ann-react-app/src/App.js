import './App.css';
import React from 'react';
import {Amplify} from 'aws-amplify';
import awsExports from "./aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from "aws-amplify";
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './components/pages/Home'


// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
  }
})

function App() {
  return (
      <Authenticator>
        {({ signOut, user }) => (
          
          
          <div className="body-wrap">
          <Router>
            <Layout signout={signOut} user={user}>
              <Routes>
                <Route path={'/'} component={Home}></Route>
              </Routes>
            </Layout>
          </Router>
        </div>
            

        )}
      </Authenticator>
  );
}

export default App;