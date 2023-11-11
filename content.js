chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getHtml") {
    // This block remains the same as before
    sendHtmlResponse();
  } else if (message.action === "getHtmlWithoutScripts") {
    // This is the new block for removing <script> tags
    sendHtmlResponse(true);
  }
});

function sendHtmlResponse(removeScripts = false) {
  let renderedHtml = document.documentElement.outerHTML;
  let title = document.title;
  let url = window.location.href;

  if (removeScripts) {
    // Create a new DOM parser and parse the rendered HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(renderedHtml, "text/html");

    // Remove all script tags from the parsed document
    const scripts = doc.querySelectorAll("script");
    scripts.forEach((script) => script.remove());

    // Serialize the document back to HTML
    renderedHtml = doc.documentElement.outerHTML;
  }

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
