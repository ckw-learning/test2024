
const { getCurrency, addCurrency } = require('./currency-api.js');
var getRawBody = require('raw-body');

exports.handler = (req, resp, context) => {

  const params = {
    path: req.path,
    queries: req.query,
    headers: req.headers,
    method: req.method,
    requestURI: req.url,
    clientIP: req.clientIP,
  };

  switch(req.method) {

    case 'POST':
      if (req.path === '/currency') {
        getRawBody(req, function (err, body) {
        const task = JSON.parse(body.toString()).task;
        try {
          addCurrency(task);
          resp.send(JSON.stringify({status: "201", description: `New currency added`}));
        } catch (error) {
          console.log(error);
          resp.send(JSON.stringify({status: "501", description: `Failed to add currency`}));
        }
      });
      break;
      }

    case 'GET':

      if (req.path.match(/^\/currency\/w+$/)) {
        const name = req.path.split('/');
        if(name.length > 2) {
          resp.send(JSON.stringify(getCurrency(name[2]).["name","symbol","description"]));
        }
      }
      else if (req.path.match(/^\/rate\/w+$/)) {
        const name = req.path.split('/');
        if(name.length === 3) {
          resp.send(JSON.stringify(getCurrency(name[2]).["rate"]));
        }
        else if (name.length === 4) {
          resp.send(JSON.stringify({status : getCurrency(name[2]).rate * name[3]}));
        }
      }
  }
}