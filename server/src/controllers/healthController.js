function getHealth(req, res) {
  res.json({
    status: "ok",
    message: "DMS Aarohi website API is running"
  });
}

module.exports = { getHealth };
