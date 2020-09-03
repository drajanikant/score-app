import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      staticData: [
        { "country": "Pakistan", "score": 23 },
        { "country": "Pakistan", "score": 127 },
        { "country": "India", "score": 3 },
        { "country": "India", "score": 71 },
        { "country": "Australia", "score": 31 },
        { "country": "India", "score": 22 },
        { "country": "Pakistan", "score": 81 },
      ],
      dynamicData: [],
      dataSource: "test",
      teams: {
        teamA: {
          countryName: "",
          averageScore: 0
        },
        teamB: {
          countryName: "",
          averageScore: 0
        },
      }


    }
  }

  countryNameChange = e => {
    let Data = [];

    if (this.state.dataSource === "test") {
      Data = [...this.state.staticData];
    } else {
      Data = [...this.state.dynamicData];
    }

    let averageScore = 0;


    const scores = Data.filter(item => item.country.toLowerCase() === e.target.value.toLowerCase());
    if (scores.length > 0) {
      averageScore = scores.map(item => item.score).reduce((prev, current) => prev + current) / scores.length;
    }

    let team = {}
    if (e.target.name === "teamA") {
      team = {
        countryName: e.target.value,
        averageScore: averageScore
      }
      let teams = { ...this.state.teams }
      teams.teamA = team;
      this.setState(
        { teams: teams }
      )
    } else {
      team = {
        countryName: e.target.value,
        averageScore: averageScore
      }
      let teams = { ...this.state.teams }
      teams.teamB = team;
      this.setState(
        { teams: teams }
      )
    }


  }

  onDataSourceChange = e => {
    const dataSource = e.target.value
    this.setState({
      dataSource: dataSource
    })

    // if (dataSource !== "test") {
    //   var myRequest = new Request("http://rsphinx.com/static/misc/cric_scores.json");
    //   fetch(myRequest, {
    //     mode: 'no-cors',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //       'Accept-Encoding': 'gzip, deflate',
    //     },

    //     referrerPolicy: 'no-referrer-when-downgrade',
    //   })
    //     .then(blob => {
    //       return blob.json();
    //     })
    //     .then(response => {
    //       console.log(response);
    //       return response.json();
    //     })
    //     .then(response => {
    //       console.log(response);
    //     }).catch(error => {
    //       console.log(error)
    //       return error;
    //     });
    // }

  }

  render() {
    const { teamA, teamB } = this.state.teams;
    return (
      <div className="App">
        <div>
          <form>
            Source of data:
            <input id="src-test" type="radio" name="data-source" defaultValue="test" defaultChecked onChange={this.onDataSourceChange} />
            <label htmlFor="src-local">Test Data</label>
            <input id="src-server" type="radio" name="data-source" defaultValue="server" onChange={this.onDataSourceChange} />
            <label htmlFor="src-server">Server Data</label>
          </form>
          <div className="row">
            <div className="country">
              <form>
                The Country: <input className="country-input" type="text" name="teamA" value={teamA.countryName} onChange={this.countryNameChange} />
              </form>
            </div>
            <div className="average">
              The Average:{teamA.averageScore}
            </div>
            <div className="bar-wrapper">
            <div className="horiz-bar" style={{ width: 2 * teamA.averageScore }}>&nbsp;</div>
            </div>
          </div>
          <div className="row">
            <div className="country">
              <form>
                The Country: <input className="country-input" type="text" name="teamB" value={teamB.countryName} onChange={this.countryNameChange} />
              </form>
            </div>
            <div className="average">
              The Average: {teamB.averageScore}
            </div>
            <div className="bar-wrapper">
              <div className="horiz-bar" style={{ width: 2 * teamB.averageScore }}>&nbsp;</div>
            </div>
            
          </div>
        </div>

      </div>
    );
  }
}

export default App;
