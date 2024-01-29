export const getLocalIPAddress = () => {
  // Creating a RTCPeerConnection object
  var pc = new RTCPeerConnection();

  // Creating a dummy data channel
  pc.createDataChannel("");

  // Creating an empty offer
  pc.createOffer().then(function (offer) {
    if (!offer?.sdp) {
      return null;
    }
    // Extracting the local IP address from the SDP
    var regex = /(?:\/ip4\/)([0-9\.]+)/g;
    var match = regex.exec(offer.sdp);
    if (!match) {
      return null;
    }
    var localIP = match[1];

    // Closing the connection
    pc.close();

    return localIP;
  });
};
