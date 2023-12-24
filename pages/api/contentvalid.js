import { isContentValid } from "../../lib/docs"

export default async function handler(req, res) {
    try {
        const { slug } = req.query;
        res.status(200).send({
            valid: isContentValid(slug.split('#-#')),
        })
    } catch (err) {
        res.status(500).send({ error: 'Check if content valid failed!' })
    }
}