const dgram = require("node:dgram");
const server = dgram.createSocket("udp4");
const dnsPacket = require("dns-packet");

const db = {
  "geekconvert.com": {
    type: "A",
    data: "1.2.4.5",
  },
  "blog.geekconvert.com": {
    type: "CNAME",
    data: "hashnode.network",
  },
};

server.on("message", (msg, remoteInfo) => {
  // console.log({ msg }); //msg is encoded so we can't simple read it. msg is in binary
  // console.log({ msg.toString() }); //msg is encoded so we can't simple read it.
  // console.log({ remoteInfo }); this is address from where the query came
  const incomingPacket = dnsPacket.decode(msg);
  // console.log("Incoming msg");

  // console.log({ remoteInfo });
  // console.log({ incomingPacket });
  // console.log(incomingPacket.questions);

  const ipFromDb = db[incomingPacket.questions[0].name];

  const ans = dnsPacket.encode({
    type: "response",
    id: incomingPacket.id,
    flags: dnsPacket.AUTHORITATIVE_ANSWER,
    questions: incomingPacket.questions,
    answers: [
      {
        type: ipFromDb.type,
        class: "IN",
        name: incomingPacket.questions[0].name,
        data: ipFromDb.data,
      },
    ],
  });

  server.send(ans, remoteInfo.port, remoteInfo.address);
});

server.bind(53, () => console.log("my server running on port 53"));
