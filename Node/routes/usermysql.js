var express = require("express");
var router = express.Router();
const connector = require("../connect");
router.get("/createtable", function (req, res) {
  console.log(connector);
  const sql =
    "CREATE TABLE users (email varchar(50), password varchar(50), userinfo text, dob date)";
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get("/", function (req, res) {
  const sql = "SELECT * FROM users";
  connector.query(sql, function (err, results, fields) {
    res.json({ results });
  });
});
router.post("/", function (req, res) {
  const { email, password, userinfo, dob } = req.body;
  const sql = `INSERT INTO users VALUES ("${email}","${password}","${userinfo}","${dob}")`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.delete("/:email", function (req, res) {
  const sql = `DELETE FROM users WHERE email = "${req.params.email}"`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.put("/:email", function (req, res) {
  const { email, password, userinfo, dob } = req.body;
  const sql = `UPDATE users SET email = "${email}",password = "${password}",userinfo = "${userinfo}", dob = "${dob}" WHERE email = "${req.params.email}"`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get("/deleteall", function (req, res) {
  const sql = "DELETE FROM users";
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
module.exports = router;
