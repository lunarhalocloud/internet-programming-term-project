import React, { useState } from "react";
import './Inputquery.css';
import axios from 'axios';
 
export default function Inputquery() {
  const [text, setText] = useState("");
  const [out1, setTable1] = useState("");
  const [out2, setTable2] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onClick1 = (e) => {
    fetch('http://localhost:4000', {
      method: "post",
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        platform : "metacritic",
        search: text
      })
    }).then(response => response.json())
    .then(response => {
      var out = "<table><thead><tr><th>Rank</th><th>Title</th><th>Platform</th><th>Released</th><th>Score</th></tr></thead></tbody>";
      const temp = response.map(function(item) {
        out += "<tr><td>" + item.rank + "</td>";
        out += "<td>" + item.title + "</td>";
        out += "<td>" + item.platform + "</td>";
        out += "<td>" + item.released + "</td>";
        out += "<td>" + item.score + "</td></tr>";
      });
      out += "</tbody></table>";
      setTable1(out);
    });
  };
    const onClick2 = (e) => {
      fetch('http://localhost:4000', {
        method: "post",
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify({
          platform : "opencritic",
          search: text
        })
      }).then(response => response.json())
      .then(response => {
        var out = "<table><thead><tr><th>Rank</th><th>Title</th><th>Platform</th><th>Released</th><th>Score</th></tr></thead></tbody>";
        const temp = response.map(function(item) {
          out += "<tr><td>" + item.rank + "</td>";
          out += "<td>" + item.title + "</td>";
          out += "<td>" + item.platform + "</td>";
          out += "<td>" + item.released + "</td>";
          out += "<td>" + item.score + "</td></tr>";
        });
        out += "</tbody></table>";
        setTable2(out);
      });
  };
  
  return (
    <div>
      <div className="head">
      Search<br></br>
      <input onChange={onChange} value={text} />
      <button onClick={onClick1}>Metacritic Search</button>
      <button onClick={onClick2}>Opencritic Search</button>
      <div className="query">
        Finding Game: {text}
      </div>
      <div className="left" id="left">
        Metacritic Search
        <div className="score_table" dangerouslySetInnerHTML={{__html: out1}}></div>
      </div>
      <div className="right" id="right">
        Opencritic Search
        <div className="score_table" dangerouslySetInnerHTML={{__html: out2}}></div>
      </div>
      </div>
    </div>
  );
}