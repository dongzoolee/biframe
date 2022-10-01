const changeIcon = (value) =>
  chrome.action.setIcon({ path: `./lgtm-${value}.png` });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'changeIcon') {
    chrome.storage.local.set({ on: message.value });
    changeIcon(message.value);
    sendResponse({ status: 'ok' });
  }
});

chrome.action.onClicked.addListener(async () => {
  const { on } = (await chrome.storage.local.get('on')) || { on: false };

  changeIcon(!on);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleIframe', value: !on });
  });
  chrome.storage.local.set({ on: !on });
});
