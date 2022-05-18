const soap = require('soap');
const express = require('express');
const fs = require('fs');

// the splitter function, used by the service
function splitter_function(args) {
  console.log('splitter_function');
  const splitter = args.splitter;
  const splitted_msg = args.message.split(splitter);
  const result = [];
  for (let i of splitted_msg) {
    result.push(splitted_msg[i]);
  }
  return {
    result: result
  }
}

// servicio
const serviceObject = {
  MessageSplitterService: {
    MessageSplitterServiceSoapPort: {
      MessageSplitter: splitter_function
    },
    MessageSplitterServiceSoap12Port: {
      MessageSplitter: splitter_function
    }
  }
};

// cargamos el archivo awds
const xml = fs.readFileSync('service.wsdl', 'utf8');

const app = express();

app.get('/', function (req, res) {
  res.send('app soap en node');
})

const port = 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
  const wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log(`Check http://localhost:${port}${wsdl_path}?wsdl to see if the service is working`)
});
