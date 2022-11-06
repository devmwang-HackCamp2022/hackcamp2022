// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  age: number
  friends: string[]
}
// TODO: delete me
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({
    name: 'John Doe',
    age: 42,
    friends: ['Jane Doe', 'John Smith'],
  })
}
