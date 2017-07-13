# soyfall [![Build Status](https://img.shields.io/travis/kevmannn/soyfall/master.svg?style=flat-square)](https://travis-ci.org/kevmannn/soyfall)

> A React / Redux app to monitor daily rainfall in soybean-saturated locales

> [soyfall](https://soyfall.now.sh)

## The problem (and a solution):
> Create a service that shows today's total rainfall for counties that produce a lot of soybeans. The user can choose a state to filter the results.

## Focus:
> Frontend

## Stack & Technical choices:
> React, Redux, React-mapbox-gl, React-vis, Reselect, Material-ui

## Challenges & Tradeoffs:
> trying not to represent too much at a given moment
> opting not to implement [`rheostat`](https://github.com/airbnb/rheostat) to allow the user to dynamically set `soybeanYieldBounds`.
> assumptions in development related to caching the store.

## Lessons:
* Willingness to close the laptop and just think should be commensurate with obscurity concerning the "large-scale path" of the solution.

* The interpretation of the problem will fluctuate, and given its extreme importance (with respect to how all subsequent thinking takes shape) thus demands attention to how it is "heard".

* Much thinking can be contingent on (apparent) API limitations and assumptions about response formats.

## Future:
* Correlate the forecast with boon / doom of the crop (given the nature of soybean and the crop's history (which should also be accomodated in the app)).

* For the sake of triage, use the mapbox API to show shortest paths (and directions) between farm locations the user cares about.

* Account for the fact of weather forecasting (possibly) being [PSPACE-hard](http://www.sigecom.org/exchanges/volume_7/3/FORTNOW.pdf)

<!-- finding a path: -->
<!-- "Create a service that shows today's total rainfall for counties that produce a lot of soybeans. The user can choose a state to filter the results." -->
> Chart the (aggregate) cumulative precipIntensity series, with hint showing _that_ accumulation at that (= highlighted) point and top three of activeCounties with _most rainfall / soybeanYield_.
> Show all activeCounties on the map, with special attention paid to the top three with _most rainfall / soybeanYield_

## License

MIT © [Kevin Donahue](https://twitter.com/nonnontrivial)
