import { NextApiResponse, NextApiRequest } from 'next'
import { subscribers } from './subscribers'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(subscribers)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
