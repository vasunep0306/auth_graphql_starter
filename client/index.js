import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import App from "./components/App";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";
import requireAuth from "./components/requireAuth";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: "/graphql",
    credentials: "same-origin",
  }),
});

const Root = () => {
  return (
    <ApolloProvider client={apolloClient}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="login" component={LoginForm} />
        <Route path="signup" component={SignUpForm} />
        <Route path="dashboard" component={requireAuth(Dashboard)} />
      </Route>
    </Router>
  </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
