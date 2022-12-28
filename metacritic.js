const axios = require("axios");
const cheerio = require("cheerio");
const MongoClient = require("mongodb").MongoClient;

const getHtml = async () => {
  try {
    // 1
    const html = await axios.get("https://www.metacritic.com/browse/games/score/metascore/year/all/filtered?page=0");
    let gamelist = [];
    // 2
    const $ = cheerio.load(html.data);
    // 3
    var bodyList = $("div.browse_list_wrapper.one.browse-list-large table tbody tr").not("tr.spacer");
    bodyList.map((i, element) => {
      gamelist[i] = {
         site: "metacritic",
         rank: $(element).find("td:eq(1) span.title.numbered").text().replace(".","").trim(),
         title: $(element).find("td:eq(1) a.title").text().trim(),
         platform: $(element).find("td:eq(1) div.clamp-details div.platform span.data").text().trim(),
         released: $(element).find("td:eq(1) div.clamp-details span:eq(2)").text().trim(),
         score: $(element).find("td:eq(1) div.clamp-score-wrap a div").text().trim()
      };
    });
    bodyList = $("div.browse_list_wrapper.two.browse-list-large table tbody tr").not("tr.spacer");
    for (let i = 0; i < bodyList.length; i++)
    {
      gamelist[i+5] = {
         site: "metacritic",
         rank: bodyList.eq(i).find("td:eq(1) span.title.numbered").text().replace(".","").trim(),
         title: bodyList.eq(i).find("td:eq(1) a.title").text().trim(),
         platform: bodyList.eq(i).find("td:eq(1) div.clamp-details div.platform span.data").text().trim(),
         released: bodyList.eq(i).find("td:eq(1) div.clamp-details span:eq(2)").text().trim(),
         score: bodyList.eq(i).find("td:eq(1) div.clamp-score-wrap a div").text().trim()
      }
   }
   bodyList = $("div.browse_list_wrapper.three.browse-list-large table tbody tr").not("tr.spacer");
   for (let i = 0; i < bodyList.length; i++)
   {
     gamelist[i+10] = {
        site: "metacritic",
        rank: bodyList.eq(i).find("td:eq(1) span.title.numbered").text().replace(".","").trim(),
        title: bodyList.eq(i).find("td:eq(1) a.title").text().trim(),
        platform: bodyList.eq(i).find("td:eq(1) div.clamp-details div.platform span.data").text().trim(),
        released: bodyList.eq(i).find("td:eq(1) div.clamp-details span:eq(2)").text().trim(),
        score: bodyList.eq(i).find("td:eq(1) div.clamp-score-wrap a div").text().trim()
     }
  }
  bodyList = $("div.browse_list_wrapper.four.browse-list-large table tbody tr").not("tr.spacer");
  for (let i = 0; i < bodyList.length; i++)
  {
    gamelist[i+15] = {
       site: "metacritic",
       rank: bodyList.eq(i).find("td:eq(1) span.title.numbered").text().replace(".","").trim(),
       title: bodyList.eq(i).find("td:eq(1) a.title").text().trim(),
       platform: bodyList.eq(i).find("td:eq(1) div.clamp-details div.platform span.data").text().trim(),
       released: bodyList.eq(i).find("td:eq(1) div.clamp-details span:eq(2)").text().trim(),
       score: bodyList.eq(i).find("td:eq(1) div.clamp-score-wrap a div").text().trim()
    }
 }
 
var db;
 MongoClient.connect('mongodb+srv://cse20181660:rlrkdldktm@cluster0.xzos63t.mongodb.net/?retryWrites=true&w=majority', function(err,db)
 {
   if (err) throw err;
   dbo = db.db('metacritic');
   dbo.collection('game').insertMany(gamelist, function(err, res){
      if (err) throw err;
      console.log("success");
      db.close();
   });
 });
  } catch (error) {
    console.error(error);
  }
};

getHtml();