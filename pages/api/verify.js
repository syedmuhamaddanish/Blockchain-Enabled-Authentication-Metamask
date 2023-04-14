import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.secretKey);
    console.log(decoded);
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(currentTime);
    if (decoded.exp < currentTime) {
      res.json({message: 'Expired'});
    } else {
      res.json({message: 'Valid'});
    }
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
