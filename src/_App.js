/* 
  Refactoring Notes:
  1. Updated class component to functional component
  2. Used react hooks to store and get state
  3. Created UserItem, this component repeats in App
  4. Added error handling
  5. Arrow functions and clean code
  6. Added value checkers to prevent app crashes
  7. Performance updates like Promise.all to get all data at the same time

  Proposal: I can add typescript to this app.
*/

import React, { useState, useEffect } from "react";
import { getUsers, getOrganizations } from "./api";

const UserItem = ({ user, selectedOrg, handleSelectOrganization, findOrganization }) => {
  // First find organization
  const org = findOrganization(user.organization)
  // To prevent ui errors
  if (!org) return null;
  return (
    <div className="user-list-item">
      <div>name: {user.name}</div>
      {/* Disabled click event if selectedOrg is null */}
      <div onClick={() => !selectedOrg && handleSelectOrganization(org)}>org: {org.name}</div>
    </div>
  )
}

const App = () => {
  // Initialize Hooks
  const [loading, setLoading] = useState(true)
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [users, setUsers] = useState(null)
  const [organizations, setOrganizations] = useState(null)

  // Initially run fetchAllData()
  useEffect(() => {
    fetchAllData();
  }, [])

  // Fetch all data(users and organizations)
  // Catch if there is a error
  // Finally set loading to false
  const fetchAllData = async () => {
    try { 
      // Fetch get requests at the same time
      const [usersData, organizationsData] = await Promise.all([getUsers(), getOrganizations()]);
      // Set data
      if(usersData) setUsers(usersData)
      if(organizationsData) setOrganizations(organizationsData)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // Find organization
  const findOrganization = (id) => {
    // find organization object by organization id
    const orgObject = organizations.find((org) => org.id === id)
    if (orgObject) return orgObject;
    return;
  }
  
  // Set selected organization
  const handleSelectOrganization = (org) => setSelectedOrg(org);

  // Reset selected organization state
  const handleResetSelectedOrganization = (e) => {
    // prevents further propagation of the current event in the capturing and bubbling phases.
    if (e.stopPropagation) e.stopPropagation()
    setSelectedOrg(null)
  }

  // Return Loading if loading is true
  if (loading) return <p>Loading...</p>

  return (
    <div>
      {selectedOrg && (
        <>
          <button onClick={handleResetSelectedOrganization}>
            reset selected org
          </button>
          {/* Filter users data by selected organization id */}
          {users && users.filter((usr) => usr.organization === selectedOrg.id).map((user) => (
            <UserItem
              key={user.id}
              user={user}
              selectedOrg={selectedOrg}
              findOrganization={findOrganization}
              handleSelectOrganization={handleSelectOrganization}
            />
          ))}
        </>
      )}
      {/* Check selected organization data and users array */}
      {!selectedOrg && users && users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          selectedOrg={selectedOrg}
          findOrganization={findOrganization}
          handleSelectOrganization={handleSelectOrganization}
        />
      ))}
    </div>
  )
}

export default App;