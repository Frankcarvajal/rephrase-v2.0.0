import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie'; 
import windowSize from 'react-window-size';

import { selectLanguage } from './actions';
import { saveDefaultLanguageToDatabase } from '../profile/actions';
import { Row, Input } from 'react-materialize';
import options from './options'; 

import './language-choice.css';

export class LanguageChoice extends Component{
 
  constructor(props) {
    super(props);

    this.accessToken = Cookies.get('accessToken');
  }

  updateDictaphoneLanguage(language) {
    this.props.dispatch(selectLanguage(language));
  }

  updateDefaultLanguage(language) {
    if (this.accessToken) {
      this.props.dispatch(saveDefaultLanguageToDatabase(language, this.accessToken));
    }
  }

  handleChange(event) {
    // event.preventDefault();
    if (event.target.value === 'default-option') {
      return;
    }
    if (this.props.forDictaphone) {
      return this.updateDictaphoneLanguage(event.target.value);
    }
    return this.updateDefaultLanguage(event.target.value);
  }

  mapOverOptions(options, props) {
    return options.map((o, index) => {
      return <option key={index} name={o.name} value={o.value}>{o.name}</option>
    });
  }

  evalWindowSize() {
    if (this.props.windowWidth < 900) {
      return (
        <select onChange={(e) =>{this.handleChange(e)}}>
          <option value='default-option'>Choose a Language</option>
          { this.mapOverOptions(options, this.props) }
        </select>
      );
    }
    return (
      <Input s={12} 
        type='select' 
        label="Language Choice"  
        onChange={(e) => {this.handleChange(e)}}
      >
        <option value='default-option'>Choose a Language</option>
        { this.mapOverOptions(options, this.props) }
      </Input>
    );
  }

  render() { 
    return (
        <Row className='language-choice-row'>
          { this.evalWindowSize() }
        </Row>
    );
  }

}

export default connect()(windowSize(LanguageChoice));
