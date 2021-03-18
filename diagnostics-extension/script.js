const REFRESH_TIME = 1000;

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

setInterval(async () => {
  const data = await fetchData();
  console.log(data);
}, REFRESH_TIME);
