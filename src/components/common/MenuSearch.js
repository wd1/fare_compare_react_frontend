import React from 'react';
import { Menu} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const MenuSearch = (props) => {
  return(
    <Menu.Menu position='right'>
      <div className='ui right aligned category search item'>
        <div className='ui icon input'>
          <NavLink
            to="/search">
            <input className='prompt' type='text' placeholder='Search destination...' />
          </NavLink>
          <i className='search link icon' />
        </div>
      </div>
    </Menu.Menu>
  )
}

export default MenuSearch;
