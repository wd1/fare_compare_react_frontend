import React from 'react';
import { Menu, Icon} from 'semantic-ui-react';

const TopMenu = (props) => {
  return(
    <Menu attached='top' inverted id='top-menu'>
      <Menu.Item
        name='menu'
        onClick={props.toggleVisibility}
      >
        <Icon name='sidebar' />
      </Menu.Item>
      {props.children}
    </Menu>

  )
}

export default TopMenu;
