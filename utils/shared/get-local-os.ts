export const getLocalOS = () => {
  const userAgent = navigator.userAgent;
  const userAgents = {
    WINDOWS: "WINDOWS",
    LINUX: "LINUX",
    ANDRIOD: "ANDRIOD",
    IOS: "IOS",
    MAC: "MAC",
    DEFAULT: "UNKNOWN",
  };

  if (userAgent.indexOf("Windows") !== -1) {
    return userAgents.WINDOWS;
  }
  if (userAgent.indexOf("Mac") !== -1) {
    return userAgents.MAC;
  }
  if (userAgent.indexOf("Linux") !== -1) {
    return userAgents.LINUX;
  }
  if (userAgent.indexOf("Android") !== -1) {
    return userAgents.ANDRIOD;
  }
  if (userAgent.indexOf("iOS") !== -1) {
    return userAgents.IOS;
  }
  return userAgents.DEFAULT;
};
