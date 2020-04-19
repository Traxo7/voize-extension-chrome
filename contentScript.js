chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'get') {
    sendResponse(true)
  }
  sendResponse(false)
})