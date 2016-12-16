// required for a functioning page
import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import { auth } from '../../../../auth0/auth';

// styling ======================================
// buttons
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

// styling
import Dialog from 'material-ui/Dialog';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import './DashboardView.scss';

// assets
import Avatar from 'material-ui/Avatar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import { green500, grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';

// placeholder imports
import Avatar1 from '../assets/ok-128.jpg';
import Avatar2 from '../assets/kolage-128.jpg';
import Avatar3 from '../assets/uxceo-128.jpg';
import Avatar4 from '../assets/kerem-128.jpg';
import Avatar5 from '../assets/raquelromanp-128.jpg';
import Room1 from '../assets/room1.jpg';
import Room2 from '../assets/room2.jpg';
import Room3 from '../assets/room3.jpg';

// menu and button customization
const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip='more'
    tooltipPosition='bottom-left'
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

// mui style overrides
const styles = {
  radioButton: {
    marginTop: 16,
  },
  logoutButton: {
    primaryColor: green500,
    color: green500,
    backgroundColor: green500,
    labelColor: green500
  }
};

// react component
class DashboardView extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    isFetching: T.bool,
    searchResults: T.array,
    updateSearchCriteria: T.func
  }

  constructor(props) {
    super(props);
    this.data = [
      { name: 'dude' }, { name: 'dudette' }, { name: 'duder' }
    ];
  }

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { searchResults, isFetching, searchCriteria, updateSearchCriteria } = this.props;
    const style = { margin: 0 };

    const actions = [
      <FlatButton
        label='Return'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='Save'
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div className='dashboard'>
       <List>
           <ListItem
            leftAvatar={
              <span>
                <Avatar src={ Avatar1 } />
                <Avatar src={ Avatar2 } size={20}/>
              </span>
            }
            primaryText='$1700 - Available December 1, 2016 - Yearly'
            secondaryText={
              <p>
              This is a great room in an amazing house, looking for guys only.
              </p>
            }
            secondaryTextLines={2}
            rightAvatar={
              <span>
                <Avatar src={ Avatar1 } size={15} />
              </span>
            }
            onTouchTap={ this.handleOpen }
          />
          <Dialog
            title='$1700 - San Francisco'
            actions={ actions }
            modal={ false }
            open={ this.state.open }
            onRequestClose={ this.handleClose }
            autoScrollBodyContent={ true }
          >
            <img src={ Room1 } className='roomView'/>
            Wow what an amazing room??
          </Dialog>
          <Divider inset={true} />
          
          <ListItem
            leftAvatar={
              <span>
                <Avatar src={ Avatar1 } />
                <Avatar src={ Avatar2 } size={20}/>
                <Avatar src={ Avatar3 } size={20}/>
              </span>
            }
            primaryText='$1700 - Available December 1, 2016 - Yearly'
            secondaryText={
              <p>
              This is a great room in an amazing house, looking for guys only.
              </p>
            }
            secondaryTextLines={2}
            rightAvatar={
              <span>
                <Avatar src={ Avatar1 } size={15} />
                <Avatar src={ Avatar1 } size={15} />
                <Avatar src={ Avatar1 } size={15} />
              </span>
            }
            onTouchTap={this.handleOpen}
          />
          <Dialog
            title='$1700 - San Francisco'
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
            <img src={ Room1 } className='roomView'/>
            Wow what an amazing room??
          </Dialog>
          <Divider inset={true} />
          <ListItem
            leftAvatar={<Avatar src={ Avatar2 } />}
            primaryText='$800 - Available January 1, 2017 - Month-to-month'
            secondaryText={
              <p>
              This is a shared room, hope you don't mind!
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider inset={true} />
          <ListItem
            leftAvatar={<Avatar src={ Avatar3 } />}
            primaryText='$750 - Available immediately - Month-to-month'
            secondaryText={
              <p>
              I'm looking for someone with a pulse. Please take the room!
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider inset={true} />
          <ListItem
            leftAvatar={<Avatar src={ Avatar4 } />}
            primaryText='$925 - Available January 1, 2017 - Yearly'
            secondaryText={
              <p>
              I like turtles.
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider inset={true} />
          <ListItem
            leftAvatar={<Avatar src={ Avatar5 } />}
            primaryText='$500 - Available immediately - Month-to-month'
            secondaryText={
              <p>
              Small room underneath staircase. No owls please.
              </p>
            }
            secondaryTextLines={2}
          />
        </List>
        <RaisedButton
          label='Update search criteria'
          primary={true}
          style={style}
          className='muidocs-icon-action-home'
          onClick={ () => updateSearchCriteria({ dog: true, cat: false }) }
        />
      </div>
    );
  }

}

export default DashboardView;
