import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const socketId = req.body.socket_id;
  const channelName = req.body.channel_name;

  if (!socketId || !channelName) {
    res.status(400).send("Missing socket_id or channel_name");
    return;
  }

  const auth = pusher.authenticate(socketId, channelName);
  res.status(200).send(auth);
}
