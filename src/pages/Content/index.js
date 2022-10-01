const targetNode = document.body;

targetNode?.addEventListener('DOMNodeInserted', ({ target }) => {
  if (target.nodeName === 'IFRAME') {
    chrome.runtime.sendMessage({ action: 'changeIcon', value: false });
    target.style.display = 'none';
    console.log('Found an iframe and was hided');
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleIframe') {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.style.display = message.value ? 'block' : 'none';
    }
  }
  sendResponse({ status: 'ok' });
});
