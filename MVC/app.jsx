class Timer extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      time: 0
    }
  }
  render () {
    const {title} = this.props;
    const start = (e) => {
      
      if(e.target.textContent == 'start'){
        e.target.textContent = 'stop';
        
        this.startTimer();
      }
      else{
        e.target.textContent = 'start';
        this.stopTimer();
      }
    }
    const reset = (e) => {
      this.resetTimer();
    }
    return (
            <div className="stopwatch-time">
              <h2> {title} </h2>
              <span> {this.state.time}</span><br/>
              <button onClick={start}>start</button>
              <button onClick={reset}>reset</button>
            </div>
     );
  }
 

class Model{
  constructor(){
    this.PLAYERS = [
      {
        name: "Jim Hoskins",
        score: 31,
        id: 1,
      },
       {
        name: "Andree Hoskins",
        score: 35,
        id: 2,
      },
       {
        name: "Alena Hoskins",
        score: 42,
        id: 3,
      }
    ];
    
  }
  subscribe(render){
    this.callback = render;
  }
  notify() {
    this.callback();
 }

 addScore(){
  let sum=0;   
  for(let player of this.PLAYERS)
    sum+=player.score;
  return sum;
}
  decrement(index){
    if(this.PLAYERS[index].score>0){
      this.PLAYERS[index].score--;
      this.callback();
    }
  }
  more(index){
    this.PLAYERS[index].score++;
    this.callback();
  }
  addPlayer(){
    if(this.input!= null && this.input.value !=''){
      this.PLAYERS.push(
        {
          name:this.input.value,
          score:0,
          id:Utils.uuid()
        }
      );
      this.input.value='';
     this.callback();
    }
  }
  reset(){

  }
}
const Header = ({model})=>{
  return (  <div className="header">
              <div className="stats">
                <table><tbody>
                  <tr><td>Players:</td><td>{model.PLAYERS.length}</td></tr>
                  <tr><td>Total ponits:</td><td>{model.addScore()}</td></tr>
                </tbody></table>
              </div>
              <div className="stopwatch">
                <h2>stopwatch</h2>
                <h1 className="stopwatch-time">0</h1>
                <button>start</button><button>reset</button>
              </div>
              <div className="stopwatch">
                <Timer title = "stopwatch"/>
              </div>
            </div>);
}

const PlayerList = ({model})=>{
  return (
    <div>
    {
      model.PLAYERS.map((item,index)=>{
            return (
                    <div key={index} className="player">
                      <div className="player-name">{item.name}</div>
                      <div className="player-score counter">
                        <button onClick={()=>model.decrement(index)} className="counter-action decrement">-</button>
                        <div className="counter-score">{item.score}</div>
                        <button onClick={()=>model.more(index)} className="counter-action increment">+</button>
                      </div>
                    </div>);
        })
    }
    </div>);
}

const PlayerForm = ({model})=>{
  return (<div className="add-player-form">
            <form
              onSubmit={e => {
                e.preventDefault();
                model.addPlayer();             
              }}
            >
              <input type="text" onChange={e => (model.input = e.target)} />
              <input type="submit" value="add player"/>
            </form>
          </div>);
}

const UserView=({title,model})=>{
  return (
    <div className="scoreboard">
     <Header model={model}/>
     <PlayerList model={model}/>
     <PlayerForm model={model}/>
     </div>
  );
}

let model = new Model();
let render = () => {
   ReactDOM.render(
      <UserView title="UserView" model={model} />,
      document.getElementById('container')
   );
};
model.subscribe(render);
render(); 