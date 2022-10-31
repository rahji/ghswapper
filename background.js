chrome.action.onClicked.addListener((tab) => {
  if(tab.url.includes("github.io")) {
    // assume it's USERNAME.github.io/REPO/optional/more/paths/
    const re_io = /https:\/\/(.*?)\.github\.io\/([^\/]*)/g;
    const url_io = tab.url;
    const matches_io = [...url_io.matchAll(re_io)];
    if (matches_io != null && matches_io[0].length == 3) {
      var new_repo_url = 'https://github.com/'+matches_io[0][1]+'/'+matches_io[0][2];
      chrome.tabs.create({ url: new_repo_url });
    }
  } else {
    // look for github.com/USERNAME/REPO
    const re_repo = /github\.com\/([^\/]*)\/([^\/]*)/g;
    const url_repo = tab.url;
    const matches_repo = [...url_repo.matchAll(re_repo)];
    if (matches_repo != null && matches_repo[0].length == 3) {
      var new_io_url = 'https://'+matches_repo[0][1]+'.github.io/'+matches_repo[0][2];
      chrome.tabs.create({ url: new_io_url });
    }
  }
})
