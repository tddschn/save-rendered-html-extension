document.getElementById("saveHtmlBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  try {
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getRenderedHtml,
    });

    const renderedHtml = result[0].result;
    const fileName = `rendered_html_${new Date().toISOString().replace(/[:.]/g, "-")}.html`;

    const blob = new Blob([renderedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download(
      {
        url: url,
        filename: fileName,
        saveAs: true,
      },
      () => {
        URL.revokeObjectURL(url);
      }
    );
  } catch (error) {
    console.error("Error executing script:", error);
  }
});

function getRenderedHtml() {
  return document.documentElement.outerHTML;
}
