chrome.runtime.onMessage.addListener(handleMessage);

async function handleMessage(message, sender, sendResponse) {
  if (message.action === "saveHtml") {
    try {
      await chrome.downloads.download({
        url: message.url,
        filename: message.fileName,
        saveAs: true,
      });
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }
}

// Register context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-html-without-scripts", // The unique ID for the menu item
    title: "Save HTML without <script> tags", // The text to be displayed
    // contexts: ["page"], // Specifies the context in which the menu item will appear; 'page' means it will show in the page context menu
    // documentUrlPatterns: ["http://*/*", "https://*/*"], // Optional: patterns specifying the URLs where the menu item will appear
  });
});

// Context Menu onClicked event
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "save-html-without-scripts") {
    // The existing handleMessage function could be reused or modified as needed.
    chrome.tabs.sendMessage(tab.id, { action: "getHtmlWithoutScripts" });
  }
});

// export { handleMessage };
