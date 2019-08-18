import React from 'react';
import { connect } from 'react-redux';

import './assets/scss/presentation.scss';

const setClass = (noStart, layout) => {
  return noStart &&
  layout.active !== layout.class[1] &&
  layout.active !== layout.class[2]
    ? 'no-start'
    : '';
};

const Presentation = ({ noStart, layout }) => {
  return <div id='col-presentation' className={setClass(noStart, layout)} />;
};

const mapState = state => {
  return {
    layout: state.Layout
  };
};

export default connect(mapState)(Presentation);
