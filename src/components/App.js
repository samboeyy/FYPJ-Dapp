import React, { Component} from 'react';
import Web3 from 'web3';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Login, Admin, Adminbb, Student, Khstudent } from "./pages";
import fyp_contract from '../abis/fyp_contract.json'



class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()

  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({account: accounts[0]})

    const networkID = await web3.eth.getId()
    console.log(networkID)

    const networkDATA = fyp_contract.networks[networkID]

    if(networkDATA){
      const fypcontract = web3.eth.Contract(fyp_contract.abi, networkDATA.address)
      this.setState({fypcontract})

      //accounts
      const lecturer_count = await fypcontract.methods.lecturer_count().call()
      this.setState({lecturer_count})
      //console.log(lecturer_count.toString())

      for (var j = 1; j <= lecturer_count; j++){
        const lectureracc = await fypcontract.methods.lecturer(j).call()
        this.setState({
          lecturer: [...this.state.lecturer, lectureracc]
        })
      }
      //console.log(this.state.lecturer)

      const student_count = await fypcontract.methods.student_count().call()
      this.setState({student_count})
      //console.log(student_count.toString())

      for (var z = 1; z <= student_count; z++){
        const studentacc = await fypcontract.methods.student(z).call()
        this.setState({
          student: [...this.state.student, studentacc]
        })
      }
      //console.log(this.state.student)
     
      //kahoot
      const time_taken_count = await fypcontract.methods.time_taken_count().call()
      this.setState({time_taken_count})
      //console.log(time_taken_count.toString())

      //kahoot
      for (var x = 1; x <= time_taken_count; x++){
        const kahootoverall = await fypcontract.methods.kahoot_overall(x).call()
        this.setState({
          kahoot_overall: [...this.state.kahoot_overall, kahootoverall]
        })
      }
      //console.log(this.state.kahoot_overall)


      //bb questions
      const count = await fypcontract.methods.count().call()
      this.setState({count})
      //console.log(count.toString())

      //load bb_questions scores
      for (var i = 1; i <= count; i++){
        const bbquestionscores = await fypcontract.methods.bb_question_scores(i).call()
        this.setState({
          bb_question_scores: [...this.state.bb_question_scores, bbquestionscores]
        })
      }
      //console.log(this.state.bb_question_scores)

 

      console.log(fypcontract)
    }

    else{
      window.alert('FYP contract is not deployed to the detected network.')
    }

  }



  constructor(props){
    super(props)
    this.state = {
      account: '',
      student: [],
      student_count:0,
      lecturer: [],
      lecturer_count:0,


      kahoot_quiz: [],
      kahoot_student: [],
      time_taken_count: 0,
      kahoot_overall: [],

      TotalSScore: [],
      
  
      bb_quiz:[],
      bb_student: [],
      bb_quiz_questions:[],
      count: 0,
      bb_question_scores:[],
      
      Quiz_Possible_Points: [],
      Student_Total: [],




    }
    this.addKahoot = this.addKahoot.bind(this)

    this.add_questions_scores = this.add_questions_scores.bind(this)
   




  }

  addKahoot( Student_ID, Kahoot_ID, Question_ID, Question, Time_Allocated, Time_Took, Score) {
    this.state.fypcontract.methods.addKahoot(Student_ID, Kahoot_ID, Question_ID, Question, Time_Allocated, Time_Took, Score).send({from: this.state.account})
  }

  
  add_questions_scores(Student_ID, Student_Full_Name,Quiz_ID,Question_ID, Question, Answer,Question_Possible_Points, Student_Manual_Points_For_This_Question, Student_Auto_Points_For_This_Question) {
    this.state.fypcontract.methods.add_questions_scores(Student_ID, Student_Full_Name,Quiz_ID,Question_ID, Question, Answer,Question_Possible_Points, Student_Manual_Points_For_This_Question, Student_Auto_Points_For_This_Question).send({from: this.state.account})
  }

  





render() {
  return (
    <div className="Apppages">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Home />} />

          <Route path="/login" exact component={() => <Login
            lecturer ={this.state.lecturer}
            student ={this.state.student}
            account ={this.state.account}
            
          />} />

          <Route exact path="/admin"  component={() => <Admin
          //kahoot
          kahoot_overall = {this.state.kahoot_overall}
          addKahoot = {this.addKahoot}
          
          //bb questions
          bb_question_scores = {this.state.bb_question_scores}
          add_questions_scores={this.add_questions_scores}

          lecturer ={this.state.lecturer}
          account ={this.state.account}
       

          />} />

          <Route exact path="/adminbb"  component={() => <Adminbb
          
          bb_question_scores = {this.state.bb_question_scores}
          lecturer ={this.state.lecturer}
          account ={this.state.account}
       

          />} />






          <Route path="/bbstudent" exact component={() => <Student 

          bb_question_scores = {this.state.bb_question_scores}
          student ={this.state.student}
          account ={this.state.account}
          />} />

          <Route path="/khstudent" exact component={() => <Khstudent
                      kahoot_overall = {this.state.kahoot_overall}

          student ={this.state.student}
          account ={this.state.account}
          />} />
        </Switch>

      </Router>
    </div>
  );
}

}
export default App;