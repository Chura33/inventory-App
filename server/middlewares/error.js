const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null
        //stack: err.stack
    })
    // console.log(process.env.NODE_ENV)
}

module.exports = errorHandler;