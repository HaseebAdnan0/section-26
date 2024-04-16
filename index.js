import bodyParser from "body-parser";
import express from "express";


const app = express();
const port = 3000;

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { all_posts: all_posts });
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    const post = all_posts.find(post => post.id === parseInt(postId));
    if (!post) {
        // If post with the specified id is not found, render an error page or redirect to another route
        res.status(404).send("Post not found");
        return;
    }
    res.render("post.ejs", { post: post });
});

app.get("/add", (req, res) => {
    res.render("add.ejs");
});

let all_posts = [
    {
        author: 'Haseeb Adnan',
        title: 'Man must explore, and this is exploration at its greatest',
        subtitle: 'Problems look mighty small from 150 miles up',
        editorContent: `<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>
        <p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>
        <p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>
        <p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>
        <p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>
        <h2 class="section-heading">The Final Frontier</h2>
        <p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>
        <p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>
        <blockquote class="blockquote">The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>
        <p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>
        <h2 class="section-heading">Reaching for the Stars</h2>
        <p>As we got further and further away, it [the Earth] diminished in size. Finally it shrank to the size of a marble, the most beautiful you can imagine. That beautiful, warm, living object looked so fragile, so delicate, that if you touched it with a finger it would crumble and fall apart. Seeing this has to change a man.</p>
        <a href="#!"><img class="img-fluid" src="/assets/img/post-sample-image.jpg" alt="..."></a>
        <span class="caption text-muted">To go places and do things that have never been done before – that’s what living is all about.</span>
        <p>Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before.</p>
        <p>As I stand out here in the wonders of the unknown at Hadley, I sort of realize there’s a fundamental truth to our nature, Man must explore, and this is exploration at its greatest.</p>
        <p>
            Placeholder text by
            <a href="http://spaceipsum.com/">Space Ipsum</a>
            · Images by
            <a href="https://www.flickr.com/photos/nasacommons/">NASA on The Commons</a>
        </p>`,
        date: "August 24, 2023",
        id: 1,
        url: "/assets/img/post-bg.jpg"
    },
    {
        date: "August 15, 2023",
        id : 2,
        url: "https://images.ctfassets.net/lzny33ho1g45/best-blog-sites-p-img/2bd18ac572f84c2984908d924d4613f3/blogging.jpg",
        author: "Harry Guinness",
        title: "The 5 best blog sites for building a successful blog",
        subtitle: "Choose the best blogging platform to showcase your content.",
        editorContent: "<p>Blogging is far from dead. As the last 12 months of Twitter—sorry, X—drama have shown, allowing a social media platform to control your audience has risks. If you want a platform where you can share your thoughts properly and keep control of things, it's impossible to beat a blog. Plus, you can always share your blog posts on social media.</p>"
    }
];

app.post("/add", (req, res) => {
    let new_post = req.body;
    let no_of_posts = Object.keys(all_posts).length;
    new_post.date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    new_post.id = no_of_posts+1;
    all_posts[no_of_posts] = new_post;
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const post = all_posts.find(post => post.id === parseInt(postId));
    if (!post) {
        res.status(404).send("Post does not exist");
    }
    res.render("edit.ejs", {post: post});
});

app.post("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const post = all_posts.find(post => post.id === parseInt(postId));
    if (!post) {
        res.status(404).send("Post does not exist");
        return;
    }
    all_posts[postId - 1].url = req.body.url;
    all_posts[postId - 1].title = req.body.title;
    all_posts[postId - 1].subtitle = req.body.subtitle;
    all_posts[postId - 1].author = req.body.author;
    all_posts[postId - 1].editorContent = req.body.editorContent;
    res.redirect(`/post/${postId}`)
});

app.get("/delete/:id", (req, res) => {
    const postId = req.params.id;
    const postIndex = all_posts.findIndex(post => post.id === parseInt(postId));
    if (postIndex === -1) {
        res.status(404).send("Post not found");
        return;
    }
    all_posts.splice(postIndex, 1);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// variables required from user: Title, Subtitle, author, body
// variables to be generated: Date, url