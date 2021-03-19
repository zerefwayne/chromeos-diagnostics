# ChromeOS Diagnostics

This Progressive-Web-App along with the Chrome extension allows user to monitor telemetric data about the system.

**:heavy_check_mark: Current Progress: All 3 milestones completed.**

The code after each milestone can be found in the branch with name `milestone-#`.

## Demo

![screencapture-localhost-8080-2021-03-19-12_51_55](https://user-images.githubusercontent.com/28949397/111744898-ee16e980-88b1-11eb-89f7-80fe4408e3dd.png)

[Video Demo](https://user-images.githubusercontent.com/28949397/111750962-e6f3d980-88b9-11eb-993b-07cf3950c2fb.mp4)

## How to use?

:warning: To run this app, please follow `Build from source` instructions as the extension hasn't been published on Chrome Store yet.

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

The extension is yet to be published.

#### Build from Source

Prerequisite: Build the website from source instead of netlify link.

1. Clone this repository/download as a ZIP on your local system.
2. Head over to `chrome://extensions` and enable `Developer Mode` on the top right menu.
3. Now click on `Load Unpacked` and select the `diagnostics-extension` directory. This will load and start the extension on the device.
4. **ADDITIONAL STEP**: Installing an extension locally changes the extension ID by which the PWA identifies it. In the `chrome://extensions` dashboard, locate the ID of ChromeOS Diagnostics extension that was just installed. Headover to `diagnostics-app` directory and locate `diagnostics-app/.env`. Replace the extensionID with the new ID to make it work. Make sure to restart the frontend server after changing this.

## Tech Stack

1. VueJS framework for building the PWA.
2. Chrome Extension for monitoring telemetry data.

