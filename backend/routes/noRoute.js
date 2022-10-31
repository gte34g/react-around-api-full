const router = require('express').Router();

router.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

module.exports = router;
