import vm from "vm";
import http from 'http';
import fetch from "node-fetch";
async function codeValidation(codeInput) {
    const sandbox = {
        e: { data:{ type:'json', payload:'test' } },
        error: null,
        fetch: fetch,
        postMessage: (res) => {
            if(res === undefined || null){
                throw "return value is null";
            }
            if(res.type === undefined || null){
                throw "return type is null";
            }
            if(res.payload === undefined || null){
                throw  "payload is null";
            }
            if(typeof(res.type) !== "string"){
                throw "type is not string";
            }
            if(typeof(res.payload) !== "string"){
                throw "payload is not string";
            }
            if(res.type === "window"){
                const url = res.payload.slice(0, 7);
                if(url !== "https://"){
                    throw "url is not valid";
                }
            }
            if(res.type === "error"){
                throw res.payload;
            }
        }
    };
    let script = null;
    try{
        script = new vm.Script(`
            try{
                ${codeInput}
            } catch (e) {
                error = e.message;
            }
        `)
    } catch(err){
        console.log(`[SYNTAX ERROR]: ${err.message}`);
        return `[SYNTAX ERROR]: ${err.message}`;
    }
    const context = new vm.createContext(sandbox);
    try{
        script.runInContext(context, {timeout: 2000});
        if(sandbox.error){
            console.log(`[RUNTIME]: ${sandbox.error}`);
            return `[RUNTIME]: ${sandbox.error}`;
        } else {
            console.log('[SUCCESS]');
            return '[SUCCESS]';
        }
    } catch (err){
        console.log(`[SYSTEM ERROR]: ${err.message}`);
        return `[SYSTEM ERROR]: ${err.message}`;
    }
}
const httpServer = http.createServer(async (req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', async () => {
            try {
                const result = await codeValidation(body);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(result);
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`[SERVER ERROR]: ${error.message}`);
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});
const PORT = 3000; // You can choose any appropriate port
httpServer.listen(PORT, () => {
    console.log(`HTTP Server listening on port ${PORT}`);
});