async function saveHtml() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  try {
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getRenderedHtml,
    });

    const { renderedHtml, title, url } = result[0].result;
    const sanitizedTitle = title.replace(/[\\/:*?"<>|]/g, '_');
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `rendered_html_${timestamp}_${sanitizedTitle}__${encodeURIComponent(url)}.html`;

    const blob = new Blob([renderedHtml], { type: "text/html" });
    const urlObj = URL.createObjectURL(blob);

    chrome.downloads.download(
      {
        url: urlObj,
        filename: fileName,
        saveAs: true,
      },
      () => {
        URL.revokeObjectURL(urlObj);
      }
    );
  } catch (error) {
    console.error("Error executing script:", error);
  }
}

function getRenderedHtml() {
  return {
    renderedHtml: document.documentElement.outerHTML,
    title: document.title,
    url: window.location.href
  };
}

// Call the function immediately
saveHtml();
