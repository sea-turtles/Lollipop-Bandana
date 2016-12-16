import React from 'react';
import { Link } from 'react-router';
import { auth } from '../../auth0/auth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { green500 } from 'material-ui/styles/colors';
import Logo from './assets/roomlylogo.png';
import './Nav.scss';

// placeholder imports
import AvatarImage from './assets/avatar.jpg';

const muiTheme = getMuiTheme({
  palette: {
    textColor: green500,
  },
  appBar: {
    height: 50,
  },
});

class Nav extends React.Component {

  render () {
    return (
      <div className='navbar-height'>
        <MuiThemeProvider muiTheme={muiTheme}>
        <ul>
          <li className='topLogo'><Link to='/'><img src={ Logo } className='pull-left' alt='Homepage' /></Link></li>
          <li className='floatRight'>
          <IconMenu
            iconButtonElement={<Avatar
              src={ AvatarImage }
              size={30}
            />}
            anchorOrigin={ { horizontal: 'right', vertical: 'top' } }
            targetOrigin={ { horizontal: 'right', vertical: 'top' } }
          >
            <Link to='/dashboard'><MenuItem primaryText='Dashboard' /></Link>
            <Link to='/settings'><MenuItem primaryText='Settings' /></Link>
            
            <MenuItem primaryText='Sign out' onClick={ auth.logout.bind(this) }/>
          </IconMenu>
          </li>
        </ul>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Nav;
