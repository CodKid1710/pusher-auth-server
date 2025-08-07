import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default function handler(req, res) {
  const socketId = req.body.socket_id;
  const channelName = req.body.channel_name;

  const auth = pusher.authenticate(socketId, channelName);
  res.status(200).send(auth);
}
