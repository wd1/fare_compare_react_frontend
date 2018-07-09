import React, { Component } from 'react';
import withAuth from '../../hocs/withAuth';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as actions from '../../actions';
import TopMenu from '../common/TopMenu';
import MenuSearch from '../common/MenuSearch';
import SideBar from '../common/SideBar';
import {renderComponents} from '../../services/renderComponents';

class Profile extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    // console.log(this.props)
    const { visible } = this.state
    const map = renderComponents.map.mapComponent()

    return (

      <div>
        <TopMenu
          toggleVisibility={this.toggleVisibility}
        >
          <MenuSearch />
        </TopMenu>
        <SideBar
          visible={visible}
          logoutUser={this.props.logoutUser}
        >
          {map}
        </SideBar>
      </div>
    )
  }
}

export default withAuth(withRouter(connect(null, actions)(Profile)));
