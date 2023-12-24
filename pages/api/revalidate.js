import querystring from "querystring";

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //   return res.status(401).json({ message: 'Invalid token' })
  // }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    const { target } = req.query;
    console.log(
      new Date().toISOString().slice(0, 23),
      "Revalidating: ",
      req.query,
      target
    );
    res.setHeader("Set-Cookie", `username=${Date.now()}; Path=/; HttpOnly`);
    await res.revalidate(encodeURI(target));
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(
      new Date().toISOString().slice(0, 23),
      "Revalidation Error: ",
      err
    );
    return res.status(500).send({ revalidated: false, message: err.message });
  }
}
