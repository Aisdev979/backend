// Parses JSON body from incoming requests
function jsonParser(req, res, next) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            req.body = body ? JSON.parse(body) : {};
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid JSON' }));
            return;
        }
        next(); // Proceed to next handler
    });
}

module.exports = jsonParser;
