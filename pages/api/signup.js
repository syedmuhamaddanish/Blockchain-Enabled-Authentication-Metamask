import { ethers } from 'ethers';
import connectDB from '@/utils/connectDB';
import User from '@/models/schema';

connectDB();

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        console.log("Trying")
      const { name, email } = req.body;
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      } 

      // Generate a new Ethereum wallet
      const wallet = ethers.Wallet.createRandom();

      // Get the address and private key of the new wallet
      
      const blockchainAddress = wallet.address;
      const blockchainPrivateKey = wallet.privateKey;
      console.log(blockchainAddress);
      // Save user data in MongoDB      
      const newUser = new User({ name, email, blockchainAddress });
      await newUser.save();

      res.status(200).json({ message: blockchainPrivateKey });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}


export default handler;