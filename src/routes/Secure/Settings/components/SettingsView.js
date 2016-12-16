import React, { PropTypes as T } from 'react';
import { auth } from '../../../../auth0/auth';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';

import { green500 } from 'material-ui/styles/colors';

import NyanCat from '../assets/nyancat.jpg';
import './SettingsView.scss';

// fake data =============================================
import STUB_DATA from '../../../../../server/fbgraph/stubData.js';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  tabs: {
    backgroundColor: green500
  },
  radioButton: {
    marginBottom: 16,
    checkedColor: green500,
    requiredColor: green500,
  },
  raisedButton: {
    margin: 12
  }
};

const priceMaximizer = function(px) {
  if (px > 5000) {
    return 5000;
  }
  else {
    return px;
  }
};

class SettingsView extends React.Component {

  constructor(props) {
    super(props);
    this.landlord = false;
  }

  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    isFetching: T.bool,
    isPosting: T.bool,
    settings: T.object,
    fetchSettings: T.func,
    sendSettings: T.func
  }

  componentWillMount() {
    const { fetchSettings } = this.props;
    fetchSettings({ 'user_id': auth.getUserId() }); // fetch settings before rendering
  }

  state = {
    landlord: false,

    userid: STUB_DATA.fakeUserInfo.id,
    username: STUB_DATA.fakeUserInfo.name,
    usergender: STUB_DATA.fakeUserInfo.gender,
    userlocation: STUB_DATA.fakeUserInfo.location,
    userpic: STUB_DATA.fakeUserInfo.pic,

    tenantid: STUB_DATA.fakeTenants[0].id,
    tenantminSlider: STUB_DATA.fakeTenants[0].priceMin,
    tenantmaxSlider: priceMaximizer(STUB_DATA.fakeTenants[0].priceMax),
    tenantname: STUB_DATA.fakeTenants[0].name,
    tenantpic: STUB_DATA.fakeTenants[0].pic,
    tenantsmoker: STUB_DATA.fakeTenants[0].smoking,
    tenantgender: STUB_DATA.fakeTenants[0].genderPref,
    tenantpets: STUB_DATA.fakeTenants[0].pets,
    tenantdescription: STUB_DATA.fakeTenants[0].description,

    landlordid: STUB_DATA.fakeLandlords[0].id,
    landlordname: STUB_DATA.fakeLandlords[0].name,
    landlordpic: STUB_DATA.fakeLandlords[0].pic,
    landlorddescription: STUB_DATA.fakeLandlords[0].description,
    landlordtitle: STUB_DATA.fakeLandlords[0].house.title,
    landlordcity: STUB_DATA.fakeLandlords[0].house.city,
    landlordstate: STUB_DATA.fakeLandlords[0].house.state,
    landlordprice: STUB_DATA.fakeLandlords[0].house.price,
    landlordsmoking: STUB_DATA.fakeLandlords[0].house.smoking,
    landlordpets: STUB_DATA.fakeLandlords[0].house.pets,
    landlordhousePics: STUB_DATA.fakeLandlords[0].house.pics,
    landlordgender: STUB_DATA.fakeLandlords[0].house.genderPref,
  };

  handleLandlord = (event, value) => {
    this.setState({ landlord: value });
  };

  handleTenantSmoker = (event, value) => {
    this.setState({ tenantsmoker: value });
  };
  handleTenantGender = (event, value) => {
    this.setState({ tenantgender: value });
  };
  handleTenantPets = (event, value) => {
    this.setState({ tenantpets: value });
  };
  handleTenantMinSlider = (event, value) => {
    this.setState({ tenantminSlider: value });
  };
  handleTenantMaxSlider = (event, value) => {
    this.setState({ tenantmaxSlider: value });
  };

  handleLandlordName = (event, value) => {
    this.setState({ landlordname: value });
  };
  handleLandlordDescription = (event, value) => {
    this.setState({ landlorddescription: value });
  };
  handleLandlordTitle = (event, value) => {
    this.setState({ landlordtitle: value });
  };
  handleLandlordCity = (event, value) => {
    this.setState({ landlordcity: value });
  };
  handleLandlordState = (event, value) => {
    this.setState({ landlordstate: value });
  };
  handleLandlordPrice = (event, value) => {
    this.setState({ landlordprice: value });
  };
  handleLandlordSmoking = (event, value) => {
    this.setState({ landlordsmoking: value });
  };
  handleLandlordPets = (event, value) => {
    this.setState({ landlordpets: value });
  };

  renderSliders() {
    if (this.state.landlord === true) {
      return (
        <span>
        <h3>Tell us a little bit about the place and what you're looking for</h3>
          <TextField
            hintText='e.g. A spacious master bedroom with its own bathroom.'
            multiLine={true}
            rows={2}
            value={ this.state.landlorddescription }
          />
        <br />
        <h3>Monthly rent</h3>
        <TextField
        hintText='$$$'
        value={ this.state.landlordprice }
        />
        <br />
        <br />
        <h3>Do you use tobacco?</h3>
          <RadioButtonGroup
           name='smokerRadio'
           defaultSelected={ this.state.landlordsmoking }
           onChange={ this.handleLandlordSmoking }
          >
            <RadioButton
              value={ false }
              label='Not a user'
              style={styles.radioButton}
            />
            <RadioButton
              value={ true }
              label='Definite user'
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        <br />
        <h3>Do you own any pets?</h3>
          <RadioButtonGroup
            name='petRadio'
            defaultSelected={ this.state.landlordpets }
            onChange={ this.handleLandlordPets }
          >
            <RadioButton
              value={ false }
              label='No pets'
              style={styles.radioButton}
            />
            <RadioButton
              value={ true }
              label='Yes pets'
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        <br />
        <h3>Any Roomy Preferences?</h3>
          <RadioButtonGroup
            name='genderRadio'
            defaultSelected={ this.state.landlordgender }
            onChange={ this.handleLandlordGender }
          >
            <RadioButton
              value={ 0 }
              label='Fellas'
              style={styles.radioButton}
            />
            <RadioButton
              value={ 1 }
              label='Ladies'
              style={styles.radioButton}
            />
            <RadioButton
              value={ 2 }
              label='I do not care'
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        </span>
      );
    } else {
      return (
        <span>
        <h3>Tell us a little bit about yourself and what you're looking for</h3>
          <TextField
            hintText='e.g. I am a smoker with five dogs.'
            multiLine={true}
            rows={2}
            value={ this.state.tenantdescription }
          /><br /><br />
        <h3>What is the minimum price you'd like to pay?</h3>
        <span>{ '$' }</span>
        <span>{ this.state.tenantminSlider }</span>
        <Slider
         min={ 0 }
         max={ 5000 }
         step={ 10 }
         value={ this.state.tenantminSlider } 
         onChange={ this.handleTenantMinSlider }                
        />
        <h3>What is the maximum price you'd like to pay?</h3>
        <span className='alignRight'>
          <span>{ '$' }</span>
          <span>{ this.state.tenantmaxSlider }</span>
          <span>{ this.state.tenantmaxSlider === 5000 ? ' and up' : '' }</span>
        </span>
        <Slider
         min={ 0 }
         max={ 5000 }
         step={ 10 }
         value={ this.state.tenantmaxSlider } 
         onChange={ this.handleTenantMaxSlider }                
        />
        <br />
        <h3>Do you use tobacco?</h3>
          <RadioButtonGroup
           name='smokerRadio'
           defaultSelected={ this.state.tenantsmoker }
           onChange={ this.handleTenantSmoker }
          >
            <RadioButton
              value={ false }
              label='Not a user'
              style={styles.radioButton}
            />
            <RadioButton
              value={ true }
              label='Definite user'
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        <br />
        <h3>Do you own any pets?</h3>
          <RadioButtonGroup
            name='petRadio'
            defaultSelected={ this.state.tenantpets }
            onChange={ this.handleTenantPets }
          >
            <RadioButton
              value={ false }
              label='No pets'
              style={styles.radioButton}
            />
            <RadioButton
              value={ true }
              label='Yes pets'
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        <br />
        <h3>Any Roomy Preferences?</h3>
          <RadioButtonGroup
            name='genderRadio'
            defaultSelected={ this.state.tenantgender }
            onChange={ this.handleTenantGender }
          >
            <RadioButton
              value={ 0 }
              label='Fellas'
              style={styles.radioButton}
            />
            <RadioButton
              value={ 1 }
              label='Ladies'
              style={styles.radioButton}
            />
            <RadioButton
              value={ 2 }
              label='I do not care'
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        </span>
      );
    }
  }


  render() {
    const { settings, isFetching, isPosting, sendSettings } = this.props;

    console.log('IN SettingsView: settings =', settings);
    console.log('IN SettingsView: isFetching =', isFetching);
    console.log('IN SettingsView: isPosting =', isPosting);

    return (
      <div className='survey-div'>
        <Tabs>
          <Tab label='About Me' style={ styles.tabs }>
            <div>
              <Card>
                <CardTitle title='Tell us more about yourself' />
                  <CardText>
                    <div>
                      <h3>Are you looking for a place or a roommate?</h3>
                        <RadioButtonGroup 
                          name='roomyRadio' 
                          defaultSelected={ this.state.landlord }
                          onChange={ this.handleLandlord }
                        >
                          <RadioButton
                            value={ false }
                            label='Seeking Room'
                            style={styles.radioButton}
                          />
                          <RadioButton
                            value={ true }
                            label='Looking for a roomy'
                            style={styles.radioButton}
                          />
                        </RadioButtonGroup>
                      <br />
                      { this.renderSliders() }
                    </div>
                  </CardText>
                  <div className='alignRight'>
                    <CardActions>
                      <RaisedButton
                        label='Save Preferences'
                        primary={true}
                        style={ styles.raisedButton }
                        className='muidocs-icon-action-home alignRight'
                        onClick={ () => sendSettings({ 'user_id': auth.getUserId(), settings: { dog: true, cat: false } }) }
                      />
                    </CardActions>
                  </div>
              </Card>
            </div>
          </Tab>
          <Tab label='Nyan Cat' style={ styles.tabs }>
            <div>
              <Card>
                <CardTitle title='NYAN NYAN NYAN' subtitle='NYANNYANNYAN' />
                <center><img src={ NyanCat } /></center>
              </Card>
            </div>
          </Tab>
        </Tabs>

      </div>
    );
  }

}
  
export default SettingsView;
