const express = require('express');
const db = require('./dbConnection/db')
const app = express();
const port = 2500;
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"1000mb"})) 

const userRouter = require('./Route/userRouter');
const userMangementRouter = require('./Route/userMangementRoute');

app.use('/api',userRouter);
app.use('/api',userMangementRouter);



const swaggerDefinition = {
    info: {
      title: "Node Test",
      version: "1.0.0",
      description: "Swagger  API Docs",
    },
    host: `localhost:2500`,
    basePath: "/",
  };
  const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ["./Route/*.js"],
  };
  const swaggerSpec = swaggerJSDoc(options);
    app.get("/swagger.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(port,(err,res)=>{
  if(err){
    console.log("Server is not connected")
  }
  else{
    console.log(`server is running at port ${port}`)
  }   
})