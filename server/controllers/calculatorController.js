const math = require('mathjs');

exports.calculate = (req, res) => {
  try {
    const { expression } = req.body;
    
    if (!expression || typeof expression !== 'string') {
      return res.status(400).json({ error: 'Invalid input: expression is required' });
    }

    const result = math.evaluate(expression);
    res.json({ result });
  } catch (error) {
    if (error instanceof SyntaxError || error.message.includes('is not a valid')) {
      return res.status(400).json({ error: 'Invalid mathematical expression' });
    }
    res.status(500).json({ error: 'Error processing calculation' });
  }
};