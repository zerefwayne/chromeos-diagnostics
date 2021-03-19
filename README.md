# ChromeOS Diagnostics

This Progressive-Web-App along with the Chrome extension allows user to monitor telemetric data about the system.

**Current Progress: All 3 milestones completed.**

## Demo


https://user-images.githubusercontent.com/28949397/111744224-e73ba700-88b0-11eb-9311-60ade931fdc9.mp4



## How to use?

### Installing the PWA

#### From Website

The PWA can be accessed on https://diagchrome.netlify.app. To install it on your system, look out for install icon or pop up given by Google Chrome Browser.

#### Build From Source

1. Clone/Download this repository on your local system.
2. Make sure you have NodeJS 12+ on your system.
3. Install `yarn` via `npm install -g yarn`.
4. cd into `diagnostics-app` directory and run the command `yarn`. This will install all necessary dependencies for your project.
5. To run the app, type `yarn serve` and it will be served on `http://localhost:8080/`

### Installing the Chrome Extension

#### Download from Chrome Store

#### Build from Source

1. Clone this repository/download as a ZIP on your local system.
2. Head over to `chrome://extensions` and enable `Developer Mode` on the top right menu.
3. Now click on `Load Unpacked` and select the `diagnostics-extension` directory. This will load and start the extension on the device.

