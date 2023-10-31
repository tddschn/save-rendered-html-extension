chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getHtml") {
    const renderedHtml = document.documentElement.outerHTML;
    const title = document.title;
    const url = window.location.href;
    const sanitizedTitle = title.replace(/[\\/:*?"<>|]/g, "_");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `rendered_html_${timestamp}_${sanitizedTitle}__${btoa(
      url
    )}.html`;

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
  }
});
