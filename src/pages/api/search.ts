import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      `https://finance-blog.microcms.io/api/v1/blogs?q=${req.body.q}&orders=-publishedAt`,
      {
        headers: {
          "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
        },
      }
    )

    const data = await response.json()

    if (!data) {
      return res.status(404).json({ message: "データが見つかりませんでした。" })
    }

    res.status(200).json(data)
  } catch (err: any) {
    console.log(err.message)
    res.status(500).json({ message: "エラーが発生しました。" })
  }
}

export default handler
