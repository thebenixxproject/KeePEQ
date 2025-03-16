# Chrome Extension - Advanced Parametric Equalizer for Web Pages

## Overview
This project is a Chrome extension that functions as an advanced parametric equalizer for web pages. It allows users to customize audio settings for specific websites, providing controls for gain, frequency, and bandwidth (Q) across multiple bands. Users can save their settings for each page and toggle the equalizer on and off as needed.

## Features
- **Parametric Equalizer**: Adjust gain, frequency, and Q for at least 5 bands.
- **Real-Time Audio Processing**: Apply audio adjustments in real-time on web pages.
- **Page-Specific Customization**: Save and load equalizer settings for individual web pages.
- **Intuitive User Interface**: A user-friendly popup interface with sliders for adjustments and a frequency response graph.
- **Toggle Functionality**: Easily activate or deactivate the equalizer for the current page.
- **Compatibility**: Works with HTML5 audio elements on popular platforms like YouTube, Spotify Web, and SoundCloud.
- **Local Storage**: Utilizes Chrome's local storage to save equalization settings.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/chrome-extension-equalizer.git
   ```
2. Navigate to the project directory:
   ```
   cd chrome-extension-equalizer
   ```
3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`.
   - Enable "Developer mode" in the top right corner.
   - Click on "Load unpacked" and select the `src` directory of the project.

## Usage
- Click on the extension icon in the Chrome toolbar to open the popup interface.
- Adjust the sliders to set your desired audio parameters.
- Click "Save" to store the settings for the current page.
- The extension will automatically load the saved settings when you revisit the page.
- Use the toggle button to activate or deactivate the equalizer as needed.

## Technologies Used
- JavaScript
- Web Audio API
- HTML/CSS
- Chrome Extension API
- Tone.js (for audio manipulation)

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is open-source and free to use. Please refer to the LICENSE file for more details.