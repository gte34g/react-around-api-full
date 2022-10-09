const errorPage = ((req, res) => {
  res.status(404).send({ message: ` Route ${req.url} Not found.` });
});

module.exports = errorPage;
