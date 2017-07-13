import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import isEqual from 'lodash/isEqual';

// import * as selectors from './selectors';
// import ForecastMap from './ForecastMap';
// import ForecastChart from './ForecastChart';
import { loadForecasts } from '../actions';

class VisualizationDyad extends PureComponent {
  static propTypes = {
    // activeCounties: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      highlighted: null
    }
  }

  // TODO: mv to Dashboard?
  componentWillReceiveProps({ activeCounties, loadForecasts }) {
    // loadForecasts(activeCounties);
  }

  onNearestX = (highlighted = {}) => {
    this.setState({ highlighted });
  };

  render() {
    // const { highlighted } = this.state;
    return (
      <div>
        {/*<ForecastChart />
        <ForecastMap />*/}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    // activePrecipForecasts: getActiveForecasts(state),
    // aggregatedPrecipSeries: getAggregatePrecipSeries(state)
  }
}

export default connect(mapStateToProps, { loadForecasts })(VisualizationDyad);
