import * as selectors from '../selectors';

const emptyState = {
  selectedState: '',
  soybeanProduction: {},
  forecasts: {
    blacklist: [],
    precipForecasts: []
  }
}

describe('forecast selectors', () => {
  const fullState = {
    selectedState: 'NY',
    soybeanProduction: {
      payload: [{
        stateAbbr: 'CA',
        soybeanYield: 1e7
      }]
    },
    forecasts: {
      blacklist: [],
      precipForecasts: [
        {
          id: 1,
          coords: {},
          countyName: 'x',
          lastUpdated: Date.now(),
          series: [
            { i: 0, x: Date.now(), y: 0.01 },
            { i: 1, x: Date.now(), y: 0.11 }
          ]
        },
        {
          id: 2,
          coords: {},
          countyName: 'y',
          lastUpdated: Date.now(),
          series: [
            { i: 0, x: Date.now(), y: 0.02 },
            { i: 1, x: Date.now(), y: 0.22 }
          ]
        },
      ]
    }
  }

  const { precipForecasts } = fullState.forecasts;
  it('can derive activeForecasts from state', () => {
    expect(selectors.getActiveForecasts(emptyState)).toEqual([]);
    expect(selectors.getActiveForecasts(fullState)).toEqual(precipForecasts);
  })

  it('can derive aggregateActiveForecastSeries from state', () => {
    expect(selectors.getAggregateActiveForecastSeries(emptyState)).toEqual([]);
    expect(selectors.getAggregateActiveForecastSeries(fullState)).toEqual([
      { i: 0, x: expect.any(Number), y: 0.015 },
      { i: 1, x: expect.any(Number), y: 0.165 }
    ])
  })

  it('can derive activeStates from state', () => {
    expect(selectors.getActiveStates(emptyState)).toEqual({});
    expect(selectors.getActiveStates(fullState)).toEqual({ CA: 1e7 });
  })

  it('can get forecast totals from state', () => {
    expect(selectors.getForecastTotals(emptyState)).toEqual(expect.objectContaining({
      totalCounties: expect.any(Number),
      totalSoybeanYield: expect.any(Number),
      totalRainfall: expect.any(Function)
    }))
  })

  it('can derive inclementForecasts from state', () => {
    expect(selectors.getInclementForecasts(emptyState)).toEqual([]);
    expect(selectors.getInclementForecasts(fullState)).toHaveLength(2);
  })

  it('can derive activeCounties from state', () => {
    expect(selectors.getActiveCounties(emptyState)).toEqual([]);
    expect(selectors.getActiveCounties(fullState)).toEqual([
      { countyName: 'x', id: 1, soybeanYield: undefined, totalRainfall: 0.12 },
      { countyName: 'y', id: 2, soybeanYield: undefined, totalRainfall: 0.24 }
    ])
  })

  it('can derive seriesExtremes from state', () => {
    expect(selectors.getSeriesExtremes(emptyState)).toEqual([NaN, NaN]);
    expect(selectors.getSeriesExtremes(fullState)).toEqual([0.008, 0.264]);
  })
})