import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie'; 

import { selectLanguage } from './actions';
import { saveDefaultLanguageToDatabase } from '../profile/actions';
import options from './options'; 

export class LanguageChoice extends Component{
 
  constructor(props) {
    super(props);

    this.state = {
      options: []
    };

    this.accessToken = Cookies.get('accessToken');
  }
  
  componentDidMount() {
    console.log('componentDidMount', this.props);
    const optionsJsx = this.mapOverOptions(options, this.props);
    this.updateOptionsJsx(optionsJsx);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      console.log('componentWillReceiveProps', nextProps);
      const optionsJsx = this.mapOverOptions(options, nextProps);
      this.updateOptionsJsx(optionsJsx);
    }
  }

  updateOptionsJsx(optionsJsx) {
    this.setState({
      options: optionsJsx
    })
  }

  handleChange(event){
    event.preventDefault();
    if (event.target.value === 'default-option') {
      return;
    }
    if (this.props.forDictaphone) {
      return this.updateDictaphoneLanguage(event.target.value);
    }
    return this.updateDefaultLanguage(event.target.value);
  }

  updateDictaphoneLanguage(language) {
    this.props.dispatch(selectLanguage(language));
  }

  updateDefaultLanguage(language) {
    if (this.accessToken) {
      this.props.dispatch(saveDefaultLanguageToDatabase(language, this.accessToken));
    }
  }

  mapOverOptions(options, props) {
    return options.map((o, index) => {
      if (props.user) {
        if (!props.forDictaphone && props.user.defaultLanguage === o.value) {
          return <option key={index} name={o.name} value={o.value} selected>{o.name}</option>
        }
      }
      return <option key={index} name={o.name} value={o.value}>{o.name}</option>
    });
  }

render(){ 
    return(
        <select name="Language" onChange={(e)=> this.handleChange(e)} >
          <option name='top' value='default-option'>Select a language</option>
          { this.state.options }
        </select>
    );
  }
}
const mapStateToProps = state => ({
  userLanguage: state.userLanguage,
  user: state.userData.user
});
export default connect(mapStateToProps)(LanguageChoice);
