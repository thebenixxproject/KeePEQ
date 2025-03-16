document.addEventListener('DOMContentLoaded', function () {
    const frequencySliders = [
        document.getElementById('freq1'),
        document.getElementById('freq2'),
        document.getElementById('freq3'),
        document.getElementById('freq4'),
        document.getElementById('freq5')
    ];
    const bandwidthSliders = [
        document.getElementById('bandwidth1'),
        document.getElementById('bandwidth2'),
        document.getElementById('bandwidth3'),
        document.getElementById('bandwidth4'),
        document.getElementById('bandwidth5')
    ];
    const saveButton = document.getElementById('save');
    const urlInput = document.getElementById('url');
    const presetNameInput = document.getElementById('preset-name');
    const presetList = document.getElementById('preset-list');
    const notification = document.getElementById('notification');

    let currentSettings = {
        frequencies: frequencySliders.map(slider => parseFloat(slider.value)),
        bandwidths: bandwidthSliders.map(slider => parseFloat(slider.value))
    };

    // Load saved presets
    chrome.storage.local.get(null, function (result) {
        for (const [key, value] of Object.entries(result)) {
            addPresetToList(key, value);
        }
    });

    // Save settings to local storage
    saveButton.addEventListener('click', function () {
        let url = urlInput.value.trim();
        const presetName = presetNameInput.value.trim();

        if (!url || !presetName) {
            showNotification('Please enter both URL and preset name.');
            return;
        }

        // Extract the domain from the URL
        url = new URL(url).hostname;

        const frequencies = frequencySliders.map(slider => parseFloat(slider.value));
        const bandwidths = bandwidthSliders.map(slider => parseFloat(slider.value));

        const settings = {
            frequencies: frequencies,
            bandwidths: bandwidths
        };

        const presetKey = `${url}-${presetName}`;

        chrome.storage.local.set({ [presetKey]: settings }, function () {
            showNotification('Settings saved for this preset!');
            addPresetToList(presetKey, settings);
        });
    });

    // Add preset to the list
    function addPresetToList(key, settings) {
        const li = document.createElement('li');
        li.textContent = key;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () {
            loadPreset(key, settings);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            chrome.storage.local.remove(key, function () {
                li.remove();
            });
        });

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        presetList.appendChild(li);
    }

    // Load preset settings
    function loadPreset(key, settings) {
        frequencySliders.forEach((slider, index) => {
            slider.value = settings.frequencies[index];
        });
        bandwidthSliders.forEach((slider, index) => {
            slider.value = settings.bandwidths[index];
        });
        applySettings(settings);
    }

    // Show notification
    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Apply settings in real-time
    function applySettings(settings) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: updateFilters,
                args: [settings]
            });
        });
    }

    // Update filters function to be injected into the content script
    function updateFilters(settings) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const gainNode = audioContext.createGain();
        const filters = [];

        // Create filters for each band
        for (let i = 0; i < 5; i++) {
            const filter = audioContext.createBiquadFilter();
            filter.type = 'peaking';
            filters.push(filter);
        }

        // Connect filters in series
        filters.reduce((prev, curr) => {
            prev.connect(curr);
            return curr;
        }).connect(gainNode).connect(audioContext.destination);

        // Apply settings to filters
        settings.frequencies.forEach((frequency, index) => {
            filters[index].frequency.value = frequency;
        });
        settings.bandwidths.forEach((bandwidth, index) => {
            filters[index].Q.value = bandwidth;
        });

        // Override audio elements to use the new audio context
        const audioElements = document.querySelectorAll('audio, video');
        audioElements.forEach(element => {
            const source = audioContext.createMediaElementSource(element);
            source.connect(filters[0]);
        });
    }

    // Add event listeners to sliders for real-time updates
    frequencySliders.forEach(slider => {
        slider.addEventListener('input', () => {
            currentSettings.frequencies = frequencySliders.map(slider => parseFloat(slider.value));
            applySettings(currentSettings);
        });
    });

    bandwidthSliders.forEach(slider => {
        slider.addEventListener('input', () => {
            currentSettings.bandwidths = bandwidthSliders.map(slider => parseFloat(slider.value));
            applySettings(currentSettings);
        });
    });
});