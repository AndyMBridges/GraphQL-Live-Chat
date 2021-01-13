import { ApolloProvider } from '@apollo/client'
import React, { useState } from 'react';
import { getLoggedInUser, logout } from './auth';
import client from './graphql/client'
import Chat from './Chat';
import Login from './Login';
import NavBar from './NavBar';
const App = () => {

    const [user, setUser] = useState(getLoggedInUser())

    const handleLogin = user => {
      setUser(user)
    }
  
    const handleLogout = () => {
      logout()
      setUser(null)
    }

    if (!user) {
      return <Login onLogin={user => handleLogin(user)} />;
    }
    return (
      <ApolloProvider client={client}>
        <NavBar onLogout={handleLogout} />
        <Chat user={user} />
      </ApolloProvider>
    );  
}


export default App

