import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './HomeScreen'
import DetailsScreen from './DetailsScreen'

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://172.230.56.157:4000/'
})

const client = new ApolloClient({
  cache,
  link
})

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },

)

const AppContainer = createAppContainer(AppNavigator);

const App = () =>
  <ApolloProvider client={client}>
    <AppContainer />
  </ApolloProvider>

export default App;
