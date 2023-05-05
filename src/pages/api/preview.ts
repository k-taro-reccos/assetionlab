import { NextApiRequest, NextApiResponse } from "next"

const preview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { draftKey, postId } = req.query
  if (typeof draftKey !== "string" || typeof postId !== "string") {
    res.status(404).end()
    return
  }

  const response = await fetch(
    `https://finance-blog.microcms.io/api/v1/blogs/${postId}?draftKey=${draftKey}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
      },
    }
  )
  const data = await response.json()

  if (!data) {
    return res.status(401).json({ message: "Invalid slug" })
  }

  res.setPreviewData({
    postId: data.id,
    draftKey: req.query.draftKey,
  })
  res.writeHead(307, { Location: `/${data.id}` })
  res.end("Preview mode enabled")
}

export default preview
