import { List } from 'immutable';

export const emptyState = {
  selectedState: '',
  cropYield: {},
  forecasts: {
    errorLog: {},
    disallowedIds: List(),
    precipForecasts: []
  }
}

export const fullState = {
  selectedState: 'CA',
  cropYield: {
    payload: [{
      stateAbbr: 'CA',
      soybeanYield: 1e7
    }]
  },
  factors: {
    selectedFactor: { name: 'precipIntensity', unitOfMeasure: '"' }
  },
  forecasts: {
    errorLog: {
      x: { stateAbbr: 'CA', messages: ['abyssal'] },
      y: { stateAbbr: 'CA', messages: ['doom'] }
    },
    disallowedIds: List(),
    precipForecasts: [
      {
        id: '1',
        coords: {},
        countyName: 'x',
        stateAbbr: 'CA',
        lastUpdated: Date.now(),
        series: [
          { i: 0, x: Date.now(), y: 0.01 },
          { i: 1, x: Date.now(), y: 0.11 }
        ]
      },
      {
        id: '2',
        coords: {},
        countyName: 'y',
        stateAbbr: 'CA',
        lastUpdated: Date.now(),
        series: [
          { i: 0, x: Date.now(), y: 0.02 },
          { i: 1, x: Date.now(), y: 0.22 }
        ]
      },
    ]
  }
}
