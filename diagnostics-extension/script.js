const REFRESH_TIME = 1000;

const fetchProcessorUsage = () => {
  chrome.system.cpu.getInfo((data) => {
    console.log(data);
  });
};

const fetchMemoryUsage = () => {
  chrome.system.memory.getInfo((data) => {
    console.log(data);
  });
};

const fetchStorageUsage = () => {
  chrome.system.storage.getInfo((data) => {
    console.log(data);
  });
};

setInterval(async () => {
  fetchProcessorUsage();
  fetchMemoryUsage();
  fetchStorageUsage();
}, REFRESH_TIME);
