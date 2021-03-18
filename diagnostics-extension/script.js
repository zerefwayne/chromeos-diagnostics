const REFRESH_TIME = 3000;
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

console.log(fetchTabID());

setInterval(async () => {
  const data = await fetchData();
  console.log(data);

  let targetTabs = await fetchTargetTabIds();
  targetTabs = targetTabs.map(tab => tab.id);
  console.log(targetTabs);
}, REFRESH_TIME);
