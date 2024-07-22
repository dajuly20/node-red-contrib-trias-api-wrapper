
# TRIAS -  Access live public transportation data
>  Uses [trias-client](https://github.com/andaryjo/trias-client) to
> retrieve data from a Trias API endpoint.
> *API **Endpoint** and API-**KEY** required! (see below)*  

## Getting Started

To start using  `node-red-contrib-trias-api-wrapper`, you can install it through the built-in Node-RED Palette manager or using npm:

```sh
npm install node-red-contrib-trias-api-wrapper
```

## Setup

-   [Choose endpoint and request your API Key (free)](https://github.com/public-transport/ideas/issues/18)

With these, you're ready to configure your  `node-red-contrib-trias-api-wrapper`  nodes.

## Usage

* `Trias Search Stop` provides fulltext search for `Station ID`   's  using `msg.payload` as input.

* `Trias Departures` provides live departure times and delay information for a station using it's unique `Station ID`  which can be provided as  `msg.payload`.  


## Examples

* Will I catch my tram dashboard (import => [examples](./examples/dashboard.json))

* Alexa, will I catch my tram flow?  (import => [examples](./examples/alexaWannKommtDieTram.json))

  

## Reference:

* [TRIAS API Endpoints & where to ask for API KEY](https://github.com/public-transport/ideas/issues/18) (free)
* https://github.com/andaryjo/trias-client/blob/main/docs/README.md

## Screenshots:   

![Screenshow Flow](images/screenshowFlow.png)

![Screenshow Phone](images/screenshot.jpg)