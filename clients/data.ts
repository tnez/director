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
