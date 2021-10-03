import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/CurrentUser";
import mutation from "../mutations/LogOut";

class Header extends Component {
  onLogoutClick(e) {
    e.preventDefault();

    const opts = { refetchQueries: [{ query }] };

    this.props.mutate(opts);
  }
  renderButtons() {
    const { user, loading } = this.props.data;
    if (loading) {
      return <div />;
    }
    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Log Out</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
        </div>
      );
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">{this.renderButtons()} </ul>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(graphql(query)(Header));
