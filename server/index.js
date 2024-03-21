import "dotenv/config";
import app from "./app.js";
import con from "./connectDb.js";

const PORT = process.env.PORT || 3000;

con.connect((err) => {
    if(err) throw err;

    console.log("connected");
    
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
})

