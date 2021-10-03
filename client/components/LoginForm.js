import React, { Component } from "react";
import AuthForm from "./AuthForm";
import { graphql } from "react-apollo";
import mutation from "../mutations/LogIn";
import { times } from "lodash";
import query from "../queries/CurrentUser";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }
  onSubmit({ email, password }) {
    const ops = { variables: { email, password }, refetchQueries: [{ query }] };

    this.props.mutate(ops).catch((res) => {
      const errors = res.graphQLErrors.map(err => err.message);
      this.setState({ errors });
    });
  }
  render() {
    return (
      <div>
        <h3>Log In</h3>
        <AuthForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(mutation)(graphql(query)(LoginForm));
