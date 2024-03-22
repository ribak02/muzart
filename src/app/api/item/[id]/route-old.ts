// pages/api/items/[id].ts
import { artworks } from '../../data'

interface Item {
  id: number
  name: string
  description: string
  model: string
  imgSrc: string
  tags: string[]
  source: string
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const artwork = artworks.find((artwork) => artwork.id === parseInt(params.id))
  return Response.json(artwork)
}
