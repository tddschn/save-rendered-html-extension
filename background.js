chrome.runtime.onMessage.addListener(handleMessage);

async function handleMessage(message, sender, sendResponse) {
  if (message.action === 'saveHtml') {
    try {
      await chrome.downloads.download({
        url: message.url,
        filename: message.fileName,
        saveAs: true,
      });
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }
}

export { handleMessage };
