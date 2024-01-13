
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// imports above are replacement for @babel/polyfill

import React from 'react';
import ReactDOM from 'react-dom';

import Devengers from '../components/Devengers.jsx';
// import '../styles/styles.scss'
import '../styles/style.css';

ReactDOM.render(<Devengers />, document.getElementById('root'));