document.getElementById("saveHtmlBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.executeScript(tab.id, { code: 'document.documentElement.outerHTML;' }, (results) => {
    const renderedHtml = results[0];
    const fileName = `rendered_html_${new Date().toISOString().replace(/[:.]/g, "-")}.html`;

    const blob = new Blob([renderedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
      url: url,
      filename: fileName,
      saveAs: true,
    }, () => {
      URL.revokeObjectURL(url);
    });
  });
});
