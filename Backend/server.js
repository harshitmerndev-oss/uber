const http=require('http');
const app=require('./app')

// SUGGESTION: Use uppercase PORT because that is the common environment variable name.
const port=process.env.Port || 3000

const server=http.createServer(app);
server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
