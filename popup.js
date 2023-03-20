document.getElementById('saveHtmlBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: saveRenderedHtml,
  });
});

function saveRenderedHtml() {
  const renderedHtml = document.documentElement.outerHTML;
  const fileName = `rendered_html_${new Date().toISOString()}.html`;

  const blob = new Blob([renderedHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  chrome.runtime.sendMessage({ action: 'saveHtml', url, fileName });
}
