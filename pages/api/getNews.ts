// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  data: string
  isSuccess: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let data
  const response = await fetch("https://ynet.co.il")
  const isSuccess = response.status == 200
  data = await response?.text()
  return res.status(200).send({ isSuccess, data })
}
