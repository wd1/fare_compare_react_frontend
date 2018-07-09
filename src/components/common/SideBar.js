import React from 'react';
import { Sidebar, Segment, Menu, Icon} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const SideBar = (props) => {
  return(
    <Sidebar.Pushable as={Segment} id="ui-segment-pushable">
      <Sidebar as={Menu} animation='slide out' width='thin' visible={props.visible} icon='labeled' vertical inverted>
        <Menu.Item name='ridenow'>
          <Icon name='taxi' />
          <NavLink
            to="/search">
            Find Ride Now
          </NavLink>
        </Menu.Item>
        <Menu.Item name='profile'>
          <Icon name='user circle'/>
          <NavLink
            to="/profile">
            Home
          </NavLink>
        </Menu.Item>
        <Menu.Item name='signout'>
          <Icon name='sign out'/>
          <NavLink
            onClick={props.logoutUser}
            to="/login">
            Sign Out
          </NavLink>
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher id="pusher">
        <Segment basic id="basic-segment">
          {props.children}
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default SideBar;
