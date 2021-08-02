var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Permission for CORS policy */
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Admin@008",
  port: 3306,
  database: "employee",
});

app.get('/ping',(req,res)=>{
  res.send('pong');
})

con.connect(function (err) {
  if (err) throw err;
});

// add employee

app.post("/create", verifyToken, function (req, res) {
  console.log("test");
  var f_name = req.body.f_name;
  var l_name = req.body.l_name;
  var phone = req.body.phone;
  var email = req.body.email;
  var sup_id = req.body.sup_id;

  console.log(req.body);

  try {
    var sql =
      "insert into employee_master(f_name,l_name,phone,email,sup_id) values ('" +
      f_name +
      "','" +
      l_name +
      "','" +
      phone +
      "','" +
      email +
      "','" +
      sup_id +
      "')";
    con.query(sql, function (error, results, fields) {
    //  console.log({ error, results, fields });
      if (error) {
        res.status(400).json({ error: error.message, code: error.code });
      }
      if (results) {
        console.log("Connected!");
        res.end('{"res":"Saved"}');
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

app.post("/add/:id", function (req, res) {
  console.log("test");
  var emp_id = req.params.id;
  var sup_id = req.body.sup_id;
  var availability = req.body.availability;
  var ontime = req.body.ontime;
  var punctuality = req.body.punctuality;
  var regularity = req.body.regularity;
  var timetorepair = req.body.timetorepair;
  var criticalproblemsolving = req.body.criticalproblemsolving;
  var clienthandling = req.body.clienthandling;
  var innovative = req.body.innovative;
  var teamPlayer = req.body.teamPlayer;
  var dependibility = req.body.dependibility;
  var given_by_id = req.body.given_by_id;
  var submit_date = req.body.submit_date;
  var tenure = req.body.tenure;
  var feedback_emp_id = req.body.feedback_emp_id;

  console.log(req.body);
  var sql =
    "insert into employee_kpi(emp_id,sup_id,feedback_emp_id,availability,ontime,punctuality,regularity,timetorepair,criticalproblemsolving,clienthandling,innovative,teamPlayer,dependibility,given_by_id,submit_date,tenure) values ('" +
    emp_id +
    "','" +
    sup_id +
    "','" +
    feedback_emp_id +
    "','" +
    availability +
    "','" +
    ontime +
    "','" +
    punctuality +
    "','" +
    regularity +
    "','" +
    timetorepair +
    "','" +
    criticalproblemsolving +
    "','" +
    clienthandling +
    "','" +
    innovative +
    "','" +
    teamPlayer +
    "','" +
    dependibility +
    "','" +
    given_by_id +
    "','" +
    submit_date +
    "','" +
    tenure +
    "')";
  con.query(sql);
  console.log("Connected!");
  res.end('{"res":"Saved"}');
});

// update employee by id

app.put("/update/:id", verifyToken, function (req, res) {
  var id = req.params.id;
  console.log("test");
  var f_name = req.body.f_name;
  var l_name = req.body.l_name;
  var phone = req.body.phone;
  var email = req.body.email;
  var status =req.body.status;
  var sup_id = req.body.sup_id;
  console.log(req.body);

  var sql =
    "update employee_master set f_name='" +
    f_name +
    "',l_name='" +
    l_name +
    "',phone='" +
    phone +
    "', email='" +
    email +
    "',sup_id='" +
    sup_id +
    "',status='" +
    status +
    "' where emp_id='" +
    id +
    "'";
  con.query(sql);
  console.log("Connected!");
  console.log(sql);
  res.end('{"res":"Update"}');
});

//get kpi list ny id

app.get("/kpi/:id", function (req, res) {
  var id = req.params.id;
  console.log(id);
  var sql = "select * from employee_kpi where emp_id='" + id + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    var jsonstr = JSON.stringify(result);
    res.end(jsonstr);
  });

  console.log("connected!");
});

// get all employees list

app.get("/list", function (req, res) {
  var sql = "SELECT * FROM employee_master";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    var jsonstr = JSON.stringify(result);
    res.end(jsonstr);
  });

  // console.log("Connected!");
  // res.end("Save done!!");
});

app.get("/supervisor", function (req, res) {
  var sql = "SELECT * FROM employee_master where status='1' ";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    var jsonstr = JSON.stringify(result);
    res.end(jsonstr);
  });

  // console.log("Connected!");
  // res.end("Save done!!");
});

//get colleagues for employee
app.get("/colleagues", verifyColleague, function (req, res) {
  var email = req.body.email;
  var sql = `SELECT em.* FROM employee_master as e INNER JOIN employee_master as em on em.sup_id = e.sup_id and em.emp_id != e.emp_id where e.email="${email}"`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    var jsonstr = JSON.stringify(result);
    res.end(jsonstr);
  });
});

// get employee by id
app.get("/details/:id", verifyToken, function (req, res) {
  var id = req.params.id;
  console.log(id);
  var sql = "select * from employee_master where emp_id='" + id + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    var jsonstr = JSON.stringify(result[0]);
    res.end(jsonstr);
  });

  console.log("Connected!");
  //res.end("Save done!!");
});

// get employee Kpi by id
app.get("/kpi_details/:id", verifyToken, function (req, res) {
  var id = req.params.id;
  console.log(id);
  var sql = "select * from employee_kpi where emp_id='" + id + "'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    var jsonstr = JSON.stringify(result[0]);
    res.end(jsonstr);
  });

  console.log("Connected!");
  //res.end("Save done!!");
});

app.post("/signIn", async function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("req", req.body);
  con.query(
    `select * from employee_master where roll=1 and email="${email}" and password="${password}"`,
    async function (error, results, fields) {
      console.log({ error, results });
      var admin = results.length ? { ...results[0] } : {};
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        if (results.length > 0) {
          const comparision = password === results[0].password;
          //const comparision = await bcrypt.compare(password, results[0].password)
          console.log("comparision", comparision);
          if (comparision) {
            let payload = { subject: password };
            let token = jwt.sign(payload, "secretKey");
            res.send({
              code: 200,
              success: "login sucessfull",
              token,
              admin: admin,
            });
          } else {
            res.send({
              code: 204,
              success: "Email and password does not match",
            });
          }
        } else {
          res.send({
            code: 206,
            success: "Email does not exits",
          });
        }
      }
    }
  );

  console.log("Connected!");
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorize Request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token == "null") {
    return res.status(401).send("Unauthorize Request");
  }
  let payload = jwt.verify(token, "secretKey");
  console.log(payload);
  if (!payload) {
    return res.status(401).send("Unauthorize Request");
  }
  req.id = payload.subject;
  next();
}

function verifyColleague(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorize Request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token == "null") {
    return res.status(401).send("Unauthorize Request");
  }
  try {
    let payload = jwt.verify(token, "secretKey");
    console.log(payload);
    if (!payload) {
      return res.status(401).send("Unauthorize Request");
    }
    req.body.email = payload.subject;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Unauthorize Request");
  }
}

// user login fuctionality

app.post("/login", async function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("req", req.body);

  const Status400Res = {
    code: 400,
    failed: "error ocurred",
  };

  con.query(
    `select * from employee_master where roll!=1 and email="${email}"`,
    async function (error, results, fields) {
      console.log(error);
      console.log({ error, results });
      var employee = results.length ? { ...results[0] } : {};
      if (error) {
        res.send(Status400Res);
      } else {
        if (results.length > 0) {
          const comparision = password === results[0].password;
          console.log("comparision", comparision);
          if (comparision) {
            let payload = { subject: email };
            let token = jwt.sign(payload, "secretKey");
            res.send({
              code: 200,
              success: "login sucessfull",
              token,
              employee: employee,
            });
          } else {
            res.send({
              code: 204,
              success: "Email and password does not match",
            });
          }
        } else {
          res.send({
            code: 206,
            success: "Email does not exits",
          });
        }
      }
    }
  );

  console.log("Connected!");
});

app.delete("/delete/:id", verifyToken, function (req, res) {
  var id = req.params.id;
  console.log("test");
  console.log(req.body);
  var sql = "DELETE FROM employee_master where emp_id='" + id + "'";
  con.query(sql);
  console.log("Connected!");
  console.log(sql);
  res.end('{"res":"Delete"}');
});

var server = app.listen(3000, function () {});
