const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

app.use(express.json());

app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessSatus: 200,
}));

app.get("/", (request, response) =>
{
  response.send('This is backend page');
});

/* localhost:3000/ 접속시 나올 메시지 */
app.post("/", (request, response) => {
  var platform = request.body.platform;
  var search = request.body.search;
  MongoClient.connect('mongodb+srv://cse20181660:rlrkdldktm@cluster0.xzos63t.mongodb.net/?retryWrites=true&w=majority', function(err,db)
  {
    if (err) throw err;
    dbo = db.db(platform);
    const query = {title : {$regex: search }};
    dbo.collection('game').find(query).toArray(function(err, game) {
      if (err)return response.status(500).json({error: err});
      if (!game) return response.status(404).json({error: 'game not found'});
      console.log(game);
      response.json(game);
      db.close();
    });
  });
});

app.listen(4000, () => {
  console.log("localhost:4000 에서 서버가 시작됩니다.");
});