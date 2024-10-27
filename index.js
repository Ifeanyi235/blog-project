import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let blogTitle = undefined;
let data = {"article1":"Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).", "article2": [11, 231, 313, 124 , 544, 53, 5], "article3":[1,11,1,,1,1,1,], "article4":[1,11,1,,1,1,1,], "article5":[1,11,1,,1,1,1,], "article6":[1,11,1,,1,1,1,], "article7":[1,11,1,,1,1,1,],
    "article8":[1,11,1,,1,1,1,], "article9":[1,11,1,,1,1,1,], "article10":[1,11,1,,1,1,1,], "article11":[1,11,1,,1,1,1,]
 };

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {data: data});
});

app.post ("/blog", (req, res) => {
    blogTitle = req.body["blogtitle"];
    let content = data[blogTitle]
    res.render ("blog.ejs", {data:[blogTitle, content]});
});

app.delete("/delete/:index", (req, res) => {
    const index = req.params.index;
    console.log(index);
    delete data[index];
    console.log(data);
    res.render("/"); 
})

app.listen (port , () => {
    console.log(`listening on port ${port}`);
});