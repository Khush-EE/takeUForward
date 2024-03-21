import express from "express";
import con from "./connectDb.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get("/", (req, res) => {
    res
    .status(200)
    .json({
        "success": true,
        "message": "Connected"
    })
});

app.post("/api/uploadCode", (req, res) => {

    let { username, language, stdin, code, time } = req.body;
    if(!username || !language || !stdin || !code) {
        res
        .status(400)
        .json({
            "success": false,
            "message": "Some data is missing"
        });

        return;
    }
    code = code.replace(`'`, `''`);
    const sql2 = 'CREATE TABLE IF NOT EXISTS codebases (username VARCHAR(255), language VARCHAR(255), stdin TEXT, code LONGTEXT, time TIMESTAMP)'
    const sql = `INSERT INTO codebases (username, language, stdin, code, time) VALUES ('${username}', '${language}', '${stdin}', '${code}', '${time}')`;

    con.query(sql2, (err) => {
        if(err) throw err;
    });

    con.query(sql, (err, results) => {
        if(err) {
            if(err) throw err;
            res
            .status(500)
            .json({
                "success": false,
                "message": "Some Error Occured"
            });
            return;
        };

        res
        .status(200)
        .json({
            "success": true,
            "data": results
        });

    })

})

app.get("/api/showCodes", (req, res) => {

    const sql = `SELECT * FROM codebases`;
    const sql2 = 'CREATE TABLE IF NOT EXISTS codebases (username VARCHAR(255), language VARCHAR(255), stdin TEXT, code LONGTEXT, time TIMESTAMP)'

    con.query(sql2, (err) => {
        if(err) throw err;
    });

    con.query(sql, (err, results) => {
        if(err) {
            res
            .status(500)
            .json({
                "success": false,
                "message": "Some Error Occured"
            });
            return;
        };

        res
        .status(200)
        .json({
            "success": true,
            "data": results
        });
    });
});

export default app;