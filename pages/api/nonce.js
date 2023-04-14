import crypto from 'crypto';
import connectDB from '@/utils/connectDB';
import User from '@/models/schema';

connectDB();

async function handler(req, res) {
  if (req.method === 'POST') {
    const {address} = req.body;
    const stringAddress = address.toString();
    try {
        const addressExists = await User.findOne({ blockchainAddress: stringAddress });
        console.log(addressExists)
        if (!addressExists) {
          return res.status(400).json({ message: 'Please register first' });
        } 

      const nonce = crypto.randomBytes(32).toString('hex');

      res.status(200).json({ message: nonce });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}


export default handler;