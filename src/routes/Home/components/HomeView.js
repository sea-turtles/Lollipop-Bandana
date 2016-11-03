'use strict';

import React, { PropTypes as T } from 'react';
import LogoImage from '../assets/roomly.png';
import { Link } from 'react-router';
import { auth } from '../../../auth0/auth';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import SvgIcon from 'material-ui/SvgIcon';
import './HomeView.scss';

const IconStyle = {
  paddingTop: 5,
  paddingLeft: 3
};

const FacebookIcon = (props) => (
  <SvgIcon style={IconStyle} viewBox='0 0 24 24'>
      <path
        transform='translate(0,2)'
        fill='#FFFFFF'
        d='M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z'
      />
  </SvgIcon>
);

class HomeView extends React.Component {
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
      <div className='jumbotron'>
        <div className='container'>
          <img className='logo' alt='roomly' src={ LogoImage }/>
          <span className='sublogo'>Find your new roommate today!</span>
          <br/>
          <br/>
          <br/>
          <div>
            <RaisedButton
              label='Login with Facebook'
              backgroundColor='#335b96'
              labelColor='#FFFFFF'
              style={style}
              className='muidocs-icon-action-home'
              icon={<FacebookIcon />}
              onClick={auth.login.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
