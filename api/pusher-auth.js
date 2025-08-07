import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default function handler(req, res) {
  // ✅ Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ Only allow POST for actual auth
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const socketId = req.body.socket_id;
  const channelName = req.body.channel_name;

  if (!socketId || !channelName) {
    return res.status(400).send("Missing socket_id or channel_name");
  }

  const presenceData = {
    user_id: req.body.user_id,
    user_info: { name: req.body.name || "Anonymous" }
  };
  
  const auth = pusher.authenticate(socketId, channelName, presenceData);
  res.status(200).send(auth);
}
