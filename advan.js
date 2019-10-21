// var express = require('express');
// var app = express();
// var server = app.listen(3000)

// app.use(function (req, res, next) {
//   console.log('Time:', Date.now())
//   next()
// })

// app.use('/user/:id', function (req, res, next) {
//     console.log('Request Type:', req.method)
//     next()
//   })

// app.get('/user/:id', function (req, res, next) {
//     res.send('USER')
//   })

const App = () => {
    let req;
    let res;

    let pipeline = [];

    const use = middleware => pipeline.push(middleware)

    
    const runMiddlewares = () => {
            if (clone.length !== 0) {
                const xuly = pipeline .shift()
                xuly(req, res, () => runMiddlewares()) 
            }
    }
    function get() {
        runMiddlewares()
    }

    return {use, get}
}

const app = App()

app.use((req, res, next) => {
    
    console.log('Middleware 1')
    next()
})

app.use((req, res, next) => {
    console.log('Middleware 2 ')
    next()
})


app.use((req, res, next) => {
    console.log('Middleware 3')
    next()
})

app.use((req, res, next) => {
    console.log('Middleware 4')
    next()
})

app.use((req, res, next) => {
    console.log('Middleware 5')
    
})

app.use((req, res, next) => {
    console.log('Middleware 6')
    
})

app.get()


