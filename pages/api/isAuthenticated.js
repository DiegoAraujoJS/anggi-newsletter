export default function handler(req, res) {
  return res.status(200).json(req.body === process.env.ADMIN_PASSWORD)
}
