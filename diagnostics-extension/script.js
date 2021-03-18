const REFRESH_TIME = 2000;
const PWA_TAB_TITLE = "diagnostics-app";

const fetchProcessorUsage = () => {
  return new Promise((resolve, reject) => {
    chrome.system.cpu.getInfo((data) => {
      resolve(data);
    });
  });
};

const fetchMemoryUsage = () => {
  return new Promise((resolve, reject) => {
    chrome.system.memory.getInfo((data) => {
      resolve(data);
    });
  });
};

const fetchStorageUsage = () => {
  return new Promise((resolve, reject) => {
    chrome.system.storage.getInfo((data) => {
      resolve(data);
    });
  });
};

const fetchData = () => {
  return new Promise(async (resolve, reject) => {
    const memory = await fetchMemoryUsage();
    const cpu = await fetchProcessorUsage();
    const storage = await fetchStorageUsage();
    let payload = {
      memory,
      cpu,
      storage,
      time: new Date()
    };
    resolve(payload);
  });
};

const fetchTargetTabIds = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true }, (tabs) => {
      resolve(tabs.filter((tab) => {
        return tab.title === PWA_TAB_TITLE;
      }));
    });
  });
};

const sendMetrics = async () => {
  let targetTabs = await fetchTargetTabIds();
  targetTabs = targetTabs.map(tab => tab.id);
  if (targetTabs.length === 0) {
    console.log("pwa not open");
    return;
  }
  const data = await fetchData();
  targetTabs.forEach((tabID) => {
    chrome.tabs.sendMessage(tabID, { greeting: "hello" }, function (response) {
      console.log(response.farewell);
    });
  });
  console.log(targetTabs, data);
};

chrome.runtime.onMessageExternal.addListener(async function(request, sender, sendResponse) {
  console.log(request, sender);
  const data = await fetchData();
  sendResponse(data);
});
