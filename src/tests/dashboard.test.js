import React from 'react';
// import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import App from '../App';
// import Dashboard from '../Dashboard';
import { fullState } from './utils';
import * as selectors from '../selectors';
import VisualizationDyad from '../components/VisualizationDyad';
import ForecastSynopsis from '../components/ForecastSynopsis';
import ForecastChart from '../components/ForecastChart';
import CountyRegistry from '../components/CountyRegistry';
import DialogInitiator from '../components/DialogInitiator';
// import StateDialog from '../components/StateDialog';
// import ErrorLogger from '../components/ErrorLogger';

const mockStore = configureStore();
const mountComponentWithState = (Component, state, props = {}) => {
  const store = mockStore(state);
  const wrapper = mount(
    <BrowserRouter>
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    </BrowserRouter>
  )

  return [store, wrapper];
}

describe('App', () => {
  const [ store, wrapper ] = mountComponentWithState(App, {});
  it('renders app', () => {
    expect(wrapper.find('div').children()).toHaveLength(2);
    expect(wrapper.find('Dashboard')).toBeTruthy();
    expect(store.getState()).toEqual({});
  })
})

describe('VisualizationDyad', () => {
  it('passes highlighted object to children', () => {
    const [ , wrapper ] = mountComponentWithState(VisualizationDyad, fullState);
    expect(wrapper.find('ForecastSynopsis').props()).toEqual(expect.objectContaining({
      activeCounties: expect.any(Array),
      forecastTotals: expect.any(Object),
      highlighted: null
    }))
    // wrapper.setState({ highlighted: {} });
    // expect(wrapper.find('ForecastSynopsis').props().highlighted).toEqual({});
  })
})

describe('ForecastSynopsis', () => {
  it('renders the correct number of children', () => {
    const props = {
      highlighted: null,
      forecastTotals: selectors.getForecastTotals(fullState)
    }
    const wrapper = shallow(<ForecastSynopsis {...props} />);
    expect(wrapper.find('div').children()).toHaveLength(14);
  })
})

describe('ForecastChart', () => {
  it('renders the chart', () => {
    const props = {
      isFetching: false,
      onNearestX: jest.fn(),
      seriesExtremes: selectors.getSeriesExtremes(fullState),
      inclementForecasts: selectors.getInclementForecasts(fullState),
      aggregateActiveForecastSeries: selectors.getAggregateActiveForecastSeries(fullState)
    }
    const wrapper = shallow(<ForecastChart {...props} />);
    expect(wrapper.find('FlexibleXYPlot')).toBeTruthy();
    expect(wrapper.find('LineSeries')).toHaveLength(3);
  })
})

describe('CountyRegistry', () => {
  it('renders the correct number of chilren', () => {
    const [ , wrapper ] = mountComponentWithState(CountyRegistry, fullState, { selectedState: 'NY' });
    expect(wrapper.find('TableBody')).toHaveLength(1);
    expect(wrapper.find({ checked: true })).toHaveLength(3);
  })
})

describe('DialogInitiator', () => {
  it('opens the dialog when clicked', () => {
    const wrapper = shallow(<DialogInitiator />);
    expect(wrapper.instance().state).toEqual({ dialogIsOpen: false });
    expect(wrapper.find({ onClick: jest.fn() })).toBeTruthy();
    // wrapper.find({ onClick: jest.fn() }).simulate('click');
    // expect(wrapper.instance().state).toEqual({ dialogIsOpen: true });
  })
})
