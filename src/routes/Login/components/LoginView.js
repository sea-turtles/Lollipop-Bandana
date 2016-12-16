import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import './LoginView.scss';
import { auth } from '../../../auth0/auth';

class LoginView extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object
  }

  constructor(props) {
    super(props);
  }

  responseFacebook(response) {
    console.log(response);
  }

  render() {
    const style = { margin: 12 };

    return (
      <div className=''>
        <h2>Login to your facebook account</h2>
        <RaisedButton
          label='FB Login'
          primary={true}
          style={style}
          className='muidocs-icon-action-home'
          icon={<FontIcon className='facebook-box'/>}
          onClick={auth.login.bind(this)}
        />
      </div>
    );
  }

}

export default LoginView;
