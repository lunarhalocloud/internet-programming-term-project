import React, { useState } from "react";
import './Inputquery.css';
 
export default function Inputquery() {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onClick1 = () => {
    axios.get('http://localhost:3000', {
      params:
      {
        all_data : 0,
        platform : "metacritic",
        search: text
      }
    }).then(function(response){
      const obj = JSON.parse(response);
      var out = "<table><tr><th>Rank</th><th>Title</th><th>Platform</th><th>Released</th><th>Score</th></tr>";
      obj.map(function(item) {
        out += "<tr><td>" + item.rank + "</td>";
        out += "<td>" + item.title + "</td>";
        out += "<td>" + item.platform + "</td>";
        out += "<td>" + item.released + "</td>";
        out += "<td>" + item.score + "</td></tr>";
      });
      out += "</table>";
    });
  };
    const onClick2 = () => {
      axios.get('http://localhost:3000', {
        params:
        {
          all_data : 0,
          platform : "opencritic",
          search: text
        }
      }).then(function(response){
        const obj = JSON.parse(response);
        var out = "<table><tr><th>Rank</th><th>Title</th><th>Platform</th><th>Released</th><th>Score</th></tr>";
        obj.map(function(item) {
          out += "<tr><td>" + item.rank + "</td>";
          out += "<td>" + item.title + "</td>";
          out += "<td>" + item.platform + "</td>";
          out += "<td>" + item.released + "</td>";
          out += "<td>" + item.score + "</td></tr>";
        });
        out += "</table>";
      });
  };

  return (
    <div className="head">
      Search<br></br>
      <input onChange={onChange} value={text} />
      <button onClick={onClick1}>Metacritic Search</button>
      <button onClick={onClick2}>Opencritic Search</button>
      <div className="query">
        Finding Game: {text}
      </div>
      <div className="left" id="left">
      </div>
      <div className="right" id="right">
      </div>
    </div>
  );
}