import React, { Component } from 'react';
import { connect } from 'react-redux';
import withAuth from '../../hocs/withAuth';
import { withRouter} from 'react-router-dom';
import * as actions from '../../actions';
import TopMenu from '../common/TopMenu';
import SideBar from '../common/SideBar';
import SearchForm from './SearchForm';

class FullSearch extends Component{

  constructor(){
    super()
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render(){
    const { visible } = this.state

    return(
      <div>
        <TopMenu
          toggleVisibility={this.toggleVisibility}
        >
        </TopMenu>
        <SideBar
          visible={visible}
          logoutUser={this.props.logoutUser}
        >
          <SearchForm />
        </SideBar>
      </div>
    )
  }
}

export default withAuth(withRouter(connect(null, actions)(FullSearch)));
