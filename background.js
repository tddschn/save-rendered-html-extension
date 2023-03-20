chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'saveHtml') {
    chrome.downloads.download({
      url: message.url,
      filename: message.fileName,
      saveAs: true,
    });
  }
});
