//cau8
const http = require('http');
const {parse} = require('querystring');

const server = http.createServer((req, res) =>{
    if(req.method ==='POST'){
        RequestData(req, result => {
            console.log(result);
            res.end(`Data:  ${result.fname}`);
        });
    } 
    else {
        res.end(`
            <!doctype html>
            <html>
            <body>
                <form action="/" method="post">
                    <input type="text" name="fname" /><br />
                    <button>Save</button>
                </form>
            </body>
            </html>
        `);
    }
});

server.listen(3000);

function RequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}
//cau9
// if(req.headers["x-access-token"] == "nextsolution") {
//     res.statusCode = 200;
//     res.end('Welcome')
//     } else {
//     res.statusCode = 404;
//     res.end('acceess denied')
// }