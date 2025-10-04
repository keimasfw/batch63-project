import express from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import flash from 'express-flash';
import session from 'express-session';
const db = new Pool({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'b62',
  max: 20,
})


const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/assets", express.static("src/assets"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash())

// req => dari client ke server
// res => dari server ke client

app.get("/contact", contact); //render
app.post("/contact", handleContact); //handle submit data
app.get("/home", home);

app.get("/portofolio/:id", portofolioDetail);

app.get("/login", login);
app.post("/login", handleLogin);


app.get("/register", register);
app.post("/register", handleregister);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
  
  let data = [
    {
      id: 1,
      title: "project 1",
    },
    {
      id: 2,
      title: "project 2",
    },
    {
      id: 3,
      title: "project 3",
    },
    {
      id: 4,
      title: "project 4",
    },
  ];
  

async function home(req, res) {
  const query = `SELECT * FROM human`;
  const result = await db.query(query);
  
  let userData;
  if (req.session.user) {
    userData = { name: req.session.user.name, email: req.session.user.email };
  }
  
  return res.render("index", { userData });
}

function contact(req, res) {
  const phoneNumber = 81210441841;
  res.render("contact", { phoneNumber });
}



async function handleContact(req, res) {
 
  //let name = req.body.name;
  //let password = req.body.password;
  let {name, password} = req.body;
  console.log(name, password);

  let account = {
    name,
    password,
  };
  // //accounts.push(account);
  const query = `INSERT INTO human(name) VALUES ('${account.name}')`;
  // const query = 'SELECT * FROM person';
  const result = await db.query(query);
  //console.log(result);
  

   res.redirect("/");
  
  }

function portofolioDetail(req, res) {
  
  res.render("portofolio");
} 

function register(req, res) {
  res.render("register", { message: req.flash("error") });
}

async function handleregister(req, res) {
  const {name, email, password} = req.body;
  const isRegistered = await db.query(
    `SELECT * FROM public.user WHERE email= '${email}'`
  );
  
  if (isRegistered.rows.length) {
    req.flash("error", "email sudah terdaftar!");
    return res.redirect("/register");
  }

  const hashed = await bcrypt.hash(password,10);
  await db.query(
    `INSERT INTO public.user(email, password, name) VALUES ('${email}', '${hashed}', '${name}')`
  );
  res.redirect("/login");
}

function login(req, res) {
  res.render("login", {message: req.flash("error")});
}  

async function handleLogin(req, res) {
 const { email, password } = req.body;
  const user = await db.query(
    `SELECT * FROM public.user WHERE email = '${email}'`
  );
  if (
    !user.rows.length ||
    !(await bcrypt.compare(password, user.rows[0].password))
  ) {
    req.flash("error", "email atau password salah");
    return res.redirect("/login");
  }
  req.session.user = {
    name: user.rows[0].name,
    email: user.rows[0].email
  };
    res.redirect('/home');
  }
