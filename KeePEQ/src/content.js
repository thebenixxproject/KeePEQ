// content.js

(function() {
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

    // Function to update filter settings
    function updateFilters(settings) {
        settings.frequencies.forEach((frequency, index) => {
            filters[index].frequency.value = frequency;
        });
        settings.bandwidths.forEach((bandwidth, index) => {
            filters[index].Q.value = bandwidth;
        });
    }

    // Load settings from storage and apply them
    chrome.storage.local.get(null, function(result) {
        const domain = window.location.hostname;
        const presetKeys = Object.keys(result).filter(key => key.startsWith(domain));
        if (presetKeys.length > 0) {
            const settings = result[presetKeys[0]];
            updateFilters(settings);
        }
    });

    // Override audio elements to use the new audio context
    const audioElements = document.querySelectorAll('audio, video');
    audioElements.forEach(element => {
        const source = audioContext.createMediaElementSource(element);
        source.connect(filters[0]);
    });
})();