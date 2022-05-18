
const soap = require('soap');
const url = 'http://localhost:3000/wsdl?wsdl';

soap.createClient(url, function (err, client) {
  if (err)throw err;
  const args = {
    message: "id1:12:34:56:out42",
    splitter: ":"
  };
  // call service
  client.MessageSplitter(args, function (err, res) {
    if (err)
      throw err;
      
    console.log(`RES =>, ${res}`); 
  });
});