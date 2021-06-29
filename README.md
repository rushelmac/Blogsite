# Blogsite
A simple blogsite built using node, express, ejs, mongoDB

## Dependancies
express
body-parser
ejs
mongoose

## Routes
* 1. Landing Page     
  * "/"                 
  * GET Route : Renders home page with a button (to /index)
* 2. Index Page       
  * "/index"            
  * POST Route: Renders index page (All blogs in database names) (Each bog name is anchor tag to /index/:id )
* 3. New blog form    
  * "/index/createBlog" 
  * GET Route : Renders form to accept info (form<action = "/index/createBlog" method= "POST">)
* 4. New blog database 
  * "/index/createBlog"
  * POST Route: Takes data from req.body updates it in mongoDB.
  
> Node version: 12.x
> MongDB version: v4.2.3
