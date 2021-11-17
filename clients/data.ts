import { Link } from '../types/link'
import dynamo from './dynamo'

export async function createLink(link: Link) {
  const { key: k, ...otherLinkData } = link
  return dynamo.put({
    Item: {
      k,
      ...otherLinkData,
    },
  })
}

export async function getLink(key: string) {
  const result = await dynamo.get({
    Key: {
      k: key,
    },
  })

  return result.Item as Link
}
