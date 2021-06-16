var bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();


//APP CONFIG
//Connect to exsting database or create one
mongoose.connect("mongodb://localhost/blogsite",{useNewUrlParser:true,useUnifiedTopology:true});
//To not to write .ejs in rendering files
app.set("view engine","ejs");
//Serve custom stylesheet
app.use(express.static("public"));
//For information taken from form tag
app.use(bodyParser.urlencoded({extended:true}));
//To avoid any script manupulation from user through input of form. It must go after bodyparser
app.use(expressSanitizer());
//Tell the app to look for '_method' keyword and treat it like a PUT request
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    body  : String,
    created : {type : Date, default:Date.now}
});

var Blog = mongoose.model("Blog", blogSchema); 

//RESFUL ROUTS
app.get("/",function(req, res){
    res.redirect("/blogs");
});

//Index Page.
app.get("/blogs",function(req, res){
    Blog.find({},function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index",{blogs : blogs});
        }
    });
});
//New blog database creation.
app.post("/blogs", function(req, res){
    // console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // console.log(req.body);
    Blog.create(req.body.blog , function(err, newBlog){
        if(err){
            console.log(err);
            res.render("new");
        }else{
            // console.log(newBlog);
            res.redirect("/blogs");
        }
    });
});

//New blog form
app.get("/blogs/new", function(req, res){
    res.render("new.ejs");
});

//Show route
app.get("/blogs/:id" , function(req,res){
    Blog.findById(req.params.id , function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", { blog : foundBlog});
        }
    });
    // console.log(req.params.id);
});

//Edit route
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id , function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit",{blog : foundBlog});
        }
    });
});

//Update route
app.put("/blogs/:id", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id , req.body.blog , function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//Delete route
app.delete("/blogs/:id",function(req, res){
    
    Blog.findByIdAndDelete(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});

app.listen("5700",function(){
    console.log("Server has been started");
});
