# Pick-a-Place - Udacity Project

## Description
A Knockout application that utilises the Google Maps and Wikipedia APIs to provide quick information about locations in a certain area.

## Prerequisites

All you need to run this project is a modern browser.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Google API
**IMPORTANT** In order to run this application you will need to generate some credentials for the Google Maps API using your google account. Please follow the steps:

1. Create a project, and enable Maps and Places APIs.
2. [Create an API Key](https://console.cloud.google.com/google/maps-apis/overview)
2. Copy your API Key into the ```key_sample.js``` file. Paste it in as the ```const KEY =``` value.
3. Rename ```key_sample.js~``` to ```key.js```

### Running the Application Locally

1. Install Prerequisites
2. Clone This Repository to your local machine
3. Make changes to the ```key_sample.js``` file. (See **Google API** section of readme)
4. Open ```index.html``` file in your favourite browser.

## Features
- Dynamically searches the area for places of interest.
- Input field for filtering of places by their name.
- Click on any marker or place in the list to search Wikipedia for relevant articles.

## Built With

* [Knockout.js](https://www.python.org/downloads/release/python-370/) - Organizational Library Used
* [Google Maps API](https://console.cloud.google.com/google/maps-apis/)
* [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page)

## Authors

* **Mateusz Lipski** - *Initial work* - [PortalFl0w](https://github.com/PortalFl0w)
