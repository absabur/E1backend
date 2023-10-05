const express = require("express");
const productRouter = require("./routes/productRoute");
const {errorResponse} = require("./controllers/responseController");
const createHttpError = require("http-errors");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const categoryRouter = require("./routes/categoryRoute");
const cors = require('cors')

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(fileUpload())
app.use(cookieParser())
app.use(express.json()); 
app.use(express.urlencoded({extended: true }));

app.use("/api/product",productRouter)
app.use("/api/user",userRouter)
app.use("/api/order",orderRouter)
app.use("/api/category",categoryRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    })
  })

// route path error handling
app.use((req, res, next) => {
    next(createHttpError(404, "route not found."))
});


// server and all error response handeller
app.use((err, req, res, next) => {
    if (err.name === "CastError") {
        return errorResponse(res, {
            statusCode: err.status,
            message: `Resource not found, invalid: ${err.path}`
        })
    }
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
})

module.exports = app;