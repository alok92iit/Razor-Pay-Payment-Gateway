if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express= require("express")
const app =express()
const path =require("path")


//Routes
const paymentRoute =require("./routes/paymentRoute")

app.set("views",path.join(__dirname,'views'))
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended :true}))

app.use(paymentRoute)


app.listen(8080,()=>{
    console.log("server runing at 8080 port")
})