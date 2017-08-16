import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import lowerCase from 'lodash/lowerCase';
import AboutIcon from 'material-ui-icons/WifiTethering';
import SelectStateIcon from 'material-ui-icons/Mms';
import { Motion, spring, presets } from 'react-motion';

import ErrorLogger from './ErrorLogger';
// import TimeSpanToggle from './TimeSpanToggle';
import DialogInitiator from './DialogInitiator';
import AboutDialog from './AboutDialog';
import StateSelectionDialog from './StateSelectionDialog';

export default class ForecastSynopsis extends Component {
  static propTypes = {
    // isFetching: PropTypes.bool,
    highlighted: PropTypes.object,
    activeCounties: PropTypes.arrayOf(PropTypes.object),
    forecastTotals: PropTypes.shape({
      selectedState: PropTypes.string,
      totalCounties: PropTypes.number,
      totalSoybeanYield: PropTypes.string,
      totalRainfall: PropTypes.func
    }).isRequired
  };

  shouldComponentUpdate({ highlighted, activeCounties }) {
    return !isEqual(highlighted, this.props.highlighted)
      || !isEqual(activeCounties, this.props.forecastTotals.totalCounties)
  }

  renderTotal(key) {
    const { forecastTotals } = this.props;
    switch (key) {
      case 'totalSoybeanYield':
        return `${forecastTotals[key]} bu`;
      case 'totalRainfall':
        return `${forecastTotals[key](24).toFixed(2)}"`;
      default:
        return forecastTotals[key];
    }
  }

  renderPartOfWhole(part, whole) {
    return (
      <Motion
        defaultStyle={{ translation: -30 }}
        style={{ translation: spring(0, presets.stiff) }}>
        {({ translation }) => (
          <div style={{ transform: `translateX(${translation}px)` }}>
            <span style={{ fontSize: '0.7em', opacity: '0.8' }}>
              {part} /
            </span> {whole}
          </div>
        )}
      </Motion>
    )
  }

  render() {
    const { highlighted, forecastTotals, activeCounties = [] } = this.props;
    return (
      <div>
        {Object.keys(forecastTotals).reverse().map((key, i) => (
          <div
            key={i}
            style={{
              display: 'inline-block',
              width: '100px',
              padding: '5px 25px',
              fontFamily: 'Rubik'
            }}>
            <p style={{ color: '#1c243d', opacity: '0.5', fontSize: '0.5em' }}>{lowerCase(key)}:</p>
            <div style={{ color: '#1c243d', fontSize: '1em', fontWeight: '300', margin: '10px 0px' }}>
              {highlighted && key === 'totalRainfall'
                ? this.renderPartOfWhole(forecastTotals[key](highlighted.i + 1).toFixed(2), this.renderTotal(key))
                : key === 'totalCounties' && activeCounties.length !== forecastTotals[key]
                  ? this.renderPartOfWhole(forecastTotals[key], activeCounties.length)
                  : this.renderTotal(key)}
            </div>
          </div>
        ))}
        <DialogInitiator
          icon={<AboutIcon />}
          dialog={<AboutDialog />} />
        <DialogInitiator
          icon={<SelectStateIcon />}
          dialog={<StateSelectionDialog />} />
        <ErrorLogger />
        {/*<TimeSpanToggle />*/}
      </div>
    )
  }
}
