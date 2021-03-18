// EXTERNAL MESSAGE LISTENER

chrome.runtime.onMessageExternal.addListener(async function(request, sender, sendResponse) {
  console.log(request, sender);
  const data = await fetchData();
  sendResponse(data);
});

// METRICS FUNCTIONS

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
