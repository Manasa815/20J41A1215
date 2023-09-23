const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/numbers", async (req, res) => {
  try {
    if (!req.query.url) {
      res.status(400).json({ error: 'Missing "url" query parameter' });
      return;
    }

    const urls = Array.isArray(req.query.url) ? req.query.url : [req.query.url];

    const responses = await Promise.all(urls.map((url) => axios.get(url)));

    const numbers = [
      ...new Set(responses.flatMap((response) => response.data.numbers)),
    ].sort((a, b) => a - b);

    const result = { numbers: numbers };

    res.send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

module.exports = router;
