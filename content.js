chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getHtml") {
    const renderedHtml = document.documentElement.outerHTML;
    const fileName = `rendered_html_${new Date().toISOString().replace(/[:.]/g, "-")}.html`;

    const blob = new Blob([renderedHtml], { type: "
