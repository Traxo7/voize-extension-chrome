const apiRoute = env.apiRoute
const VoizeURL = env.VoizeURL

function getAjax(url, success) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
  xhr.open('GET', url)
  xhr.onreadystatechange = function () {
    if (xhr.readyState > 3 && xhr.status == 200) success(xhr.responseText)
  }
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.send()
  return xhr
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, activeTab) => {
  if (changeInfo.url) {
    chrome.browserAction.setBadgeText({text: '', tabId: tabId})
    chrome.tabs.sendMessage(tabId, {action: 'get'}, function (response) {
      if (response) {
        getAjax(`${apiRoute}?url=${activeTab.url}`, (data) => {
          chrome.browserAction.setBadgeBackgroundColor({color: '#4285f4', tabId: tabId})
          chrome.browserAction.setBadgeText({text: data < 10 ? data : '9+', tabId: tabId})
        })
      }
    })
  }
})

chrome.browserAction.onClicked.addListener(function (activeTab) {
  chrome.tabs.sendMessage(activeTab.id, {action: 'get'}, function (response) {
    if (response) {
      chrome.tabs.create({url: `${VoizeURL}/?url=${activeTab.url}`})
    }
  })
})