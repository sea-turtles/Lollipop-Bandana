import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import AuthService from '../../../../auth0/utils/AuthService';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import './DashboardView.scss';

class DashboardView extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { auth } = this.props.routes[0];
    const style = { margin: 12 };

    return (
      <div className=''>
        <h2>Logout</h2>
        <RaisedButton
          label='FB Logout'
          primary={true}
          style={style}
          className='muidocs-icon-action-home'
          onClick={auth.logout.bind(this)}
        />
      </div>
    );
  }

}

export default DashboardView;