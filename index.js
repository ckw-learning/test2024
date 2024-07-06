
const { getCurrency, addCurrency } = require('./currency-api.js');
var getRawBody = require('raw-body');

exports.handler = (req, resp, context) => {

  const params = {
    path: req.path,
    queries: req.query,
    headers: req.headers,
    body: req.body,
    method: req.method,
    requestURI: req.url,
    clientIP: req.clientIP,
  };

  switch(req.method) {

    case 'POST':
      if (req.path === '/currency') {
        getRawBody(req, function (err, body) {
          const task = JSON.parse(body.toString());
          try {
            addCurrency(task.id, task.name, task.symbol, task.rate, task.description);
            resp.send(JSON.stringify({status: "201", description: `New currency added`}));
          } catch (error) {
            console.log(error);
            resp.send(JSON.stringify({status: "501", description: `Failed to add currency`}));
          }
        });
      }
      break;
    
    case 'GET':
      if (req.path.match(/^\/currency\/\w+$/)) {
        const name = req.path.split('/');
        if(name.length > 2) {
          const getName = getCurrency(name[2]).name;
          const getSymbol = getCurrency(name[2]).symbol;
          const getDescription = getCurrency(name[2]).description;
          resp.send(JSON.stringify({name: `${getName}`, symbol: `${getSymbol}`, description: `${getDescription}`}));
        }
      }
      else if (req.path.match(/^\/rate\/\w+$/)) {
        const name = req.path.split('/');
        if(name.length === 3) {
          const getRate = getCurrency(name[2]).rate;
          resp.send(JSON.stringify({rate: `${getRate}`}));
        }
      }
      else if (req.path.match(/^\/rate\/\w+\/\d+$/)) {
        const name = req.path.split('/');
        if (name.length === 4) {
          const getRate = getCurrency(name[2]).rate;
          const getAmount = Number(name[3]);
          const getExchange = getRate*getAmount;
          resp.send(JSON.stringify({exchange : `${getExchange}`}));
        }
      }
    break;
  }
}