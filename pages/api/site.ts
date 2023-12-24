import { getSiteTitle, getIconRedirectUrl, getVersion } from "../../lib/site-helper"

export default async function handler(req, res) {
  try {
    res.status(200).send({
      result: {
        title: getSiteTitle(),
        iconRedirectUrl: getIconRedirectUrl(),
        version: getVersion(),
      }
    })
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' })
  }
}