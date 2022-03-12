import React, { Component } from "react";
import { getUsers, getOrganizations } from "./api";

// App
class App extends Component {
  state = {
    loading: true,
    selectedOrg: null
  };
  users = [];
  organizations = [];
  componentDidMount() {
    getUsers()
      .then((users) => (this.users = users))
      .then(() => getOrganizations())
      .then((organizations) => (this.organizations = organizations))
      .then(() => this.setState({ loading: false }));
  }

  selectOrg = (org) => {
    this.setState({ selectedOrg: org });
  };

  resetSelectedOrg = () => {
    this.setState({ selectedOrg: false });
  };

  render() {
    if (this.state.loading) {
      return "Loading...";
    }

    let users = [];

    for (let i = 0; i < this.users.length; i++) {
      const name = this.users[i].name;
      let org;

      for (let j = 0; j < this.organizations.length; j++) {
        if (this.organizations[j].id === this.users[i].organization) {
          org = this.organizations[j].name;
        }
      }

      users.push(
        <div className="user-list-item">
          <div>name: {name}</div>
          <div onClick={() => this.selectOrg(org)}>org: {org}</div>
        </div>
      );
    }

    if (this.state.selectedOrg) {
      users = [];
      for (let i = 0; i < this.users.length; i++) {
        const orgId = this.organizations.find(
          (o) => o.name === this.state.selectedOrg
        ).id;

        if (this.users[i].organization === orgId) {
          users.push(
            <div className="user-list-item">
              <div>name: {this.users[i].name}</div>
              <div>org: {this.state.selectedOrg}</div>
            </div>
          );
        }
      }
    }

    return (
      <div>
        {this.state.selectedOrg && (
          <button onClick={() => this.resetSelectedOrg()}>
            reset selected org
          </button>
        )}
        <div className="user-list">{users}</div>
      </div>
    );
  }
}

export default App;
