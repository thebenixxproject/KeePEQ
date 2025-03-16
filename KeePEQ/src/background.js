// This file contains the background script for the Chrome extension. It manages the extension's lifecycle, handles events, and communicates with other scripts.

chrome.runtime.onInstalled.addListener(() => {
    console.log("Equalizer Extension Installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "saveSettings") {
        chrome.storage.local.set({ [request.pageUrl]: request.settings }, () => {
            sendResponse({ status: "success" });
        });
        return true; // Indicates that the response will be sent asynchronously
    }

    if (request.action === "loadSettings") {
        chrome.storage.local.get([request.pageUrl], (result) => {
            sendResponse({ settings: result[request.pageUrl] || null });
        });
        return true; // Indicates that the response will be sent asynchronously
    }
});