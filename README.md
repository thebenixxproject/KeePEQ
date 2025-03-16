KeePEQ is a Chrome extension that brings advanced parametric equalization to your browser. It allows you to adjust the audio of any website in real-time, with customizable gain, frequency, and Q settings for multiple bands. Save your EQ settings for specific websites and enjoy a personalized audio experience!

Features
Parametric Equalizer: Adjust gain, frequency, and Q for up to 5 bands.

Per-Site Customization: Save and load EQ settings for individual websites.

Real-Time Audio Processing: Apply EQ adjustments in real-time to HTML5 audio elements.

Intuitive Interface: Easy-to-use sliders and controls in the extension popup.

Developer-Friendly: Load and test the extension in Chrome's Developer Mode.

Installation (Unpacked Version)
Since KeePEQ is in development, you can load it as an unpacked extension in Chrome. Follow these steps:

1. Download the Source Code
Clone or download the KeePEQ repository from GitHub:

bash
Copy
git clone https://github.com/your-username/KeePEQ.git
2. Enable Developer Mode in Chrome
Open Chrome and go to chrome://extensions/.

Toggle the Developer Mode switch in the top-right corner.

3. Load the Unpacked Extension
Click the Load unpacked button.

Navigate to the folder where you downloaded or cloned the KeePEQ repository.

Select the folder and click Open.

4. Pin the Extension
Once loaded, you’ll see KeePEQ in your extensions list.

Click the puzzle icon in the Chrome toolbar and pin KeePEQ for easy access.

How to Use KeePEQ
1. Open the Extension
Click the KeePEQ icon in the Chrome toolbar to open the popup interface.

2. Adjust the EQ Settings
Use the sliders to adjust gain, frequency, and Q for each band.

Changes are applied in real-time to the audio of the current webpage.

3. Save Settings for the Current Website
Click the Save button to store your EQ settings for the current website.

KeePEQ will automatically load these settings the next time you visit the site.

4. Enable/Disable the EQ
Use the toggle switch in the popup to enable or disable the EQ for the current page.

Supported Websites
KeePEQ works on any website that uses HTML5 audio elements, including:

YouTube

Spotify Web

SoundCloud

Twitch

And more!

Development Notes
Web Audio API: KeePEQ uses the Web Audio API to process audio in real-time.

Chrome Storage: Settings are saved using chrome.storage.local for per-site customization.

Tone.js: The extension leverages the Tone.js library for audio processing and EQ functionality.

Contributing
KeePEQ is open-source! Feel free to contribute by:

Reporting issues or bugs.

Suggesting new features.

Submitting pull requests.

License
KeePEQ is released under the MIT License. Feel free to use, modify, and distribute it as you see fit.

Troubleshooting
EQ Not Working: Ensure the website uses HTML5 audio. KeePEQ does not work with Flash or other legacy audio technologies.

Settings Not Saving: Make sure you’re using a supported version of Chrome and that KeePEQ has the necessary permissions.

Enjoy your personalized audio experience with KeePEQ! 🎶
