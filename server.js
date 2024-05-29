const http = require('http');
const voteParties = require('./Applications');
const url = require('url');

const server = http.createServer((req, res) => {

    //Creat Parties
    if(req.method === 'POST' && req.url ===  '/create'){
        let body = ''
        req.on('data', (data) => {
            body += data.toString();
        })

        req.on('end', () => {
            const result = JSON.parse(body);
            const voteparty  = {action: result.action}
            const response = voteParties.createParties(result.name, JSON.stringify(voteparty))
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end('successfully created');
        })
    }
    else if(req.method === 'GET' && req.url === '/'){

        // Read all parties
        const files = voteParties.getAllParties();      
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify({
                voteParties: files
            }))
    }
    else if(req.method === 'GET' && req.url.includes('/read-one')){

        //Read one party
        const {query} = url.parse(req.url, true);
            const filename = query.file_name;
            const result = voteParties.getOneParty(filename);
            res.end(result)
    }
    else if(req.method =='DELETE' && req.url.includes('/delete')){

        //Delete one party
        const {query} = url.parse(req.url, true);
        const filename = query.file_name;
        const result = voteParties.deleteOneParty(filename);
        res.end(result)
    }
    // else if(req.method === 'GET' && req.url === '/update-count'){

    //     //Update count
    // }
    else{
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end('Not Found');
    }
    
    



});

server.listen(1000, () => {
    console.log('listening on port')
})