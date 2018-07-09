import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import withAuth from '../../hocs/withAuth';
import withLoc from '../../hocs/withLoc';
import * as actions from '../../actions';
import TopMenu from '../common/TopMenu';
import SideBar from '../common/SideBar';
import ResultsView from './ResultsView'


class Results extends Component{

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
          <ResultsView />
        </SideBar>
      </div>
    )
  }

}

export default withLoc(withAuth(withRouter(connect(null, actions)(Results))));
