// eslint-disable-next-line
import React, { Component, useState } from 'react';

import * as XLSX from "xlsx";
import { AdminNavigation } from '.';


class AdminDash extends Component {

  //bb
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    //this.addOne1 = this.addOne1.bind(this);
    this.readFile = this.readFile.bind(this);
    this.readFile1 = this.readFile1.bind(this);
    this.bbclick = this.bbclick.bind(this);
    this.khclick = this.khclick.bind(this);
    var storedbbcount = 0;
    if (localStorage.getItem('bbclick')) {
      storedbbcount = parseInt(localStorage.getItem('bbclick'));
    };
    var storedkhcount = 0;
    if (localStorage.getItem('khclick')) {
      storedkhcount = parseInt(localStorage.getItem('khclick'));
    }
    this.state = {
      file: "",
      file1: "",
      bbdata: [],
      khdata: [],

      bbclick: storedbbcount,
      khclick: storedkhcount,

    };
  }

  bbclick() {
    var newclick = this.state.bbclick + 0.5;
    this.setState({bbclick: newclick});
    // Set it
    localStorage.setItem('bbclick', newclick);
  }


  handleClick(e) {
    this.refs.fileUploader.click();
  }

  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    console.log(file);
    this.setState({ file });

    console.log(this.state.file);
  }

  readFile() {
    var f = this.state.file;
    // eslint-disable-next-line
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const datas = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      //console.log("Data>>>" + datas);
      const data = this.convertToJson(datas)// shows that excel data is read
      this.setState({bbdata: data});
      //console.log(data); // shows data in json format
      
    };
    reader.readAsBinaryString(f);
  }

  convertToJson(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    //return result; //JavaScript object
    return (result); //JSON
  }

  //bb

  //kh
  khclick() {
    var newclick1 = this.state.khclick + 0.5;
    this.setState({khclick: newclick1});
    // Set it
    localStorage.setItem('khclick', newclick1);
  }

  handleClick1(e) {
    this.refs.fileUploader1.click();
  }

  filePathset1(e) {
    e.stopPropagation();
    e.preventDefault();
    var file1 = e.target.files[0];
    console.log(file1);
    this.setState({ file1 });

    console.log(this.state.file1);
  }

  readFile1() {
    var f = this.state.file1;
    // eslint-disable-next-line
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get last worksheet */
      const wsname = wb.SheetNames[6];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const datas = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      //console.log("Data>>>" + datas);
      const data = this.convertToJson1(datas)// shows that excel data is read
      this.setState({khdata: data});
      //console.log(data); // shows data in json format
      
    };
    reader.readAsBinaryString(f);
  }

  convertToJson1(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    //return result; //JavaScript object
    return (result); //JSON
  }

    //addOne1(){
      //this.setState((preState) =>{
        //return{
          //kahoot_quiz_count: preState.kahoot_quiz_count + 1
        //};
      //});

    //}
    //addanother1(){
      //this.setState((preState1) =>{
        //return{
          //kahoot_question_count: preState1.kahoot_question_count + 1
        //};
      //});
    //}




  render() {

    var lectureraccs = this.props.lecturer;
    var walletacc = this.props.account;
    var loginID = sessionStorage.getItem("ID")
    for (var i = 0; i<lectureraccs.length; i++){
      var templecturer = lectureraccs[i];
      if (loginID !== templecturer[1] || walletacc !== templecturer[3]){
        window.location = "./login";
        sessionStorage.removeItem("ID");
        alert("Please Login")
        break
      }
      
    }
    return (
        <div id="admindash">
          <AdminNavigation />
        {/*kahoot */}
        <h2>Kahoot</h2>
        <form onSubmit ={(event1) => {
          event1.preventDefault()
          const Student_ID = this.StudentIDK.value
         // const Student_Full_Name = this.StudentFullNameK.value
          const Kahoot_ID = this.KahootID.value
          const Question_ID = this.QuestionIDk.value
          const Question = this.questionK.value
          const Time_Allocated = this.TimeAllocated.value
          const Time_Took = this.TimeTook.value
          const Score = this.score.value

          this.props.addKahoot( Student_ID, Kahoot_ID, Question_ID, Question, Time_Allocated, Time_Took, Score)
        }}>
        <div className="form-group mr-sm-2">
            <input
              id="StudentIDK"
              type="text"
              ref = {(input)=>{this.StudentIDK = input}}
              className="form-control"
              placeholder="Student ID"
              required />
          </div>
          {/* <div className="form-group mr-sm-2">
            <input
              id="StudentFullNameK"
              type="text"
              ref = {(input)=>{this.StudentFullNameK = input}}
              className="form-control"
              placeholder="Student Full Name"
              required />
          </div> */}
          <div className="form-group mr-sm-2">
            <input
              id="KahootID"
              type="text"
              ref = {(input)=>{this.KahootID = input}}
              className="form-control"
              placeholder="Kahoot ID"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="QuestionIDk"
              type="text"
              ref = {(input)=>{this.QuestionIDk = input}}
              className="form-control"
              placeholder="Question ID"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="questionK"
              type="text"
              ref = {(input)=>{this.questionK = input}}
              className="form-control"
              placeholder="Question"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="TimeAllocated"
              type="text"
              ref = {(input)=>{this.TimeAllocated = input}}
              className="form-control"
              placeholder="Time Allocated"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="TimeTook"
              type="text"
              ref = {(input)=>{this.TimeTook = input}}
              className="form-control"
              placeholder="Time Took"
              required />
          </div>
          <div className="form-group mr-sm-2">
            
            <input
              id="score"
              type="text"
              ref = {(input)=>{this.score = input}}
              className="form-control"
              placeholder="Score"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Details</button>
          </form>
          <br />
         
          <input
          type="file"
          id="file1"
          ref="fileUploader1"
          onChange={this.filePathset1.bind(this)}
        />
        <form
          onSubmit={(khevent) => {
            khevent.preventDefault();
            if (this.state.file1 === "") {
              alert("This is no file to upload");
            }
            else {
              this.readFile1();
              this.khclick();
              //this.addOne1();
              //console.log(this.state.kahoot_quiz_count);
              console.log(this.state.khdata)

              for(var x in this.state.khdata){
                if(this.state.khdata[x]["Question Number"] ===''){
                  this.state.khdata.splice(x)
                  
                }

            }

            var khdatak = this.state.khdata
            //console.log(khdatak.length) 

            for (var p = 0; p < khdatak.length; p++) {
              const kh_dict = khdatak[p];

              // Steps:
              // 1) access the first dictionary in the big list
              // 2) get key & value from dict
              // 3) if key == (eg. Question), put value of key['Question'] to the table
              // 4) do the same for the other keys



              // Testing

              // get key value pair
              //Object.keys(kh_dict).forEach(([key, value]) => {
              //console.log(key, value);})

              // get values by key
              //Object.keys(kh_dict).forEach((key) => {
              //console.log(kh_dict[key]);})

              // get keys
              //console.log(Object.keys(kh_dict));

              // length of keys
              //const b = Object.keys(kh_dict)
              //console.log(b.length)


              const Student_ID = kh_dict["Player"];
              var khcount = localStorage.getItem('khclick');
              const Kahoot_ID = khcount.toString();
                //for (let index = 1; index < parseInt((Object.keys(kh_dict).length)) + 1; index++) {
              const Question_ID = kh_dict["Question Number"];
              const Question = kh_dict.Question;
              //var Time_AllocatedT = kh_dict["Time Allotted to Answer (seconds)"];
              //const Time_Allocated = Time_AllocatedT.toString();
              const Time_Allocated = kh_dict["Time Allotted to Answer (seconds)"];
              const Time_Took = kh_dict["Answer Time (seconds)"];
              const Score = kh_dict["Score (points)"];
              this.props.addKahoot( Student_ID, Kahoot_ID, Question_ID, Question, Time_Allocated, Time_Took, Score);
               


              //for (let [key, value] of Object.entries(kh_dict)) {
                // Student ID
                //if (key === "Players") {
                  //const Student_ID = value.toString();
                //}

                // Kahoot Quiz ID bruh

                // Question ID
                //else if (key === "Question Number") {
                  //const Question_ID = value.toString();
                //}

                // Question
                //else if (key === "Question") {
                  //const Question = value.toString();
                //}

                // Time Allocated
                //else if (key === "Time Allotted to Answer (seconds)") {
                  //const Question = value.toString();
                //}

                // Time Took
                //else if (key === "") {

                  //const Time_Took = value.toString();
                //}

                // Score
                //else if (key === "") {

                  //const Score = value.toString();
                //}

                //this.props.addKahoot( Student_ID, Kahoot_ID, Question_ID, Question, Time_Allocated, Time_Took, Score);
                //console.log(key + ': ' + value);
              //}



              //Object.keys(kh_dict).forEach((key) => {
              //for ()
              //if (b === "Players") {
              //const Student_ID = kh_dict["Pla"]
              //}



              //console.log(kh_dict[key]);})


              //const Student_ID = kh_dict["Players"];
              //var khcount = localStorage.getItem('khclick');
              //const Kahoot_ID = khcount.toString();
              //for (let index = 1; index < parseInt((Object.keys(kh_dict).length)) + 1; index++) {
              //const Question_ID = index.toString();
              //const Question = kh_dict["Question"];
              //const Time_Allocated = kh_dict["Time Time Allotted to Answer (seconds)"];
              //const Time_Took = kh_dict["Answer Time (seconds)"];
              //const Score = kh_dict["Score (points)"];
              //this.props.addKahoot( Student_ID, Kahoot_ID, Question_ID, Question, Time_Allocated, Time_Took, Score);
              //}     
            }
        }
        }}>

        <br />
        <button button type="submit" className="btn btn-primary">Read File</button> 
      

        </form>


        <p>&nbsp;</p>
        <h2>Kahoot Details</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Student ID</th>
              {/* <th scope="col">Student Full Name</th> */}
              <th scope="col">Kahoot ID</th>
              <th scope="col">Question ID</th>
              <th scope="col">Question</th>
              <th scope="col">Time Allocated (seconds)</th>
              <th scope="col">Time Took (seconds)</th>
              <th scope="col">Question Score</th>
              <th scope="col">Total Student Score</th>
            </tr>
          </thead>
          {<tbody id ="questionlist">
          { this.props.kahoot_overall.map((kahootoverall, key1) =>{
            return (
              <tr key1 = {key1}>
              <th scope="row">{kahootoverall._id1.toString()}</th>
              <td> {kahootoverall._kahoot_student._Student_ID}</td>
              {/* <td> {kahootoverall._student._Student_Full_Name.toString()}</td> */}
              <td> {kahootoverall._kahoot_quiz._Kahoot_ID.toString()}</td>
              <td> {kahootoverall._kahoot_question._Question_ID}</td>
              <td> {kahootoverall._kahoot_question._Question}</td>
              <td> {kahootoverall._kahoot_question._Time_Allocated.toString()}</td>
              <td> {kahootoverall._Time_Took.toString()}</td>
              <td> {kahootoverall._Score.toString()}</td>
              <td> {kahootoverall._TotalSScore.toString()}</td>
              <td><button className = "buyButton"></button></td>
            </tr>

            )
          })}
        
          </tbody>}
        </table>
        <br />
        <br />
        <br />
        <br />
      {/*blackboard */}
        <h1>Blackboard</h1>
        <h2>Blackboard Details</h2>
        <form onSubmit ={(event) => {
          event.preventDefault()
          const Student_ID = this.StudentID.value
          const Student_Full_Name = this.StudentFullName.value
          const Quiz_ID = this.QuizID.value
          const Question_ID = this.QuestionID.value
          const Question = this.question.value
          const Answer = this.answer.value
          const Question_Possible_Points = this.QuestionPossiblePoints.value
          const Student_Manual_Points_For_This_Question = this.StudentManualPointsForThisQuestion.value
          const Student_Auto_Points_For_This_Question = this.StudentAutoPointsForThisQuestion.value
          this.props.add_questions_scores(Student_ID, Student_Full_Name,Quiz_ID,Question_ID, Question, Answer,Question_Possible_Points, Student_Manual_Points_For_This_Question, Student_Auto_Points_For_This_Question)
        }}>
        <div className="form-group mr-sm-2">
            <input
              id="StudentID"
              type="text"
              ref = {(input)=>{this.StudentID = input}}
              className="form-control"
              placeholder="Student ID"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="StudentFullName"
              type="text"
              ref = {(input)=>{this.StudentFullName = input}}
              className="form-control"
              placeholder="Student Full Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="QuizID"
              type="text"
              ref = {(input)=>{this.QuizID = input}}
              className="form-control"
              placeholder="Quiz ID"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="QuestionID"
              type="text"
              ref = {(input)=>{this.QuestionID = input}}
              className="form-control"
              placeholder="Question ID"
              required />
          </div>

          <div className="form-group mr-sm-2">
            <input
              id="question"
              type="text"
              ref = {(input)=>{this.question = input}}
              className="form-control"
              placeholder="Question"
              required />
          </div>

          <div className="form-group mr-sm-2">
            <input
              id="answer"
              type="text"
              ref = {(input)=>{this.answer = input}}
              className="form-control"
              placeholder="Answer"
              required />
          </div>

          <div className="form-group mr-sm-2">
            <input
              id="QuestionPossiblePoints"
              type="text"
              ref = {(input)=>{this.QuestionPossiblePoints = input}}
              className="form-control"
              placeholder="Question Possible Points"
              required />
          </div>

          <div className="form-group mr-sm-2">
            <input
              id="StudentManualPointsForThisQuestion"
              type="text"
              ref = {(input)=>{this.StudentManualPointsForThisQuestion = input}}
              className="form-control"
              placeholder="Student Manual Points for question"
              required />
          </div>

          <div className="form-group mr-sm-2">
            <input
              id="StudentAutoPointsForThisQuestion"
              type="text"
              ref = {(input)=>{this.StudentAutoPointsForThisQuestion = input}}
              className="form-control"
              placeholder="Auto Points for question"
              required />
          </div>

          <button type="submit" className="btn btn-primary">Add Details</button>
          </form>
          <br/>
          <input 
          type="file"
          id="file"
          ref="fileUploader"
          onChange={this.filePathset.bind(this)}
        />
        <form
          onSubmit={(bbevent) => {
            bbevent.preventDefault()
            if (this.state.file ===""){
              alert("This is no file to upload");
            }
            else{
              this.readFile();
              this.bbclick();
              //console.log(this.state.bbdata)

              for(var x in this.state.bbdata){
                if(this.state.bbdata[x]["Username"] ===''){
                  this.state.bbdata.splice(x)
                  
                }
              }
              var bbdataf = this.state.bbdata
              //console.log(bbdataf.length)

              //9,15,21,27,33,39,45,51,57,63
              for (var k=0; k<bbdataf.length;k++){
                const student_dict = bbdataf[k];
                if ((Object.keys(student_dict).length -3) % 6 === 0) {
                  const Student_ID = student_dict["Username"];
                  const Student_Full_Name = student_dict["Last Name"] + student_dict["First Name"];
                  var quizcount = localStorage.getItem('bbclick');
                  const Quiz_ID = quizcount.toString();
                  for (let index = 1; index < parseInt((Object.keys(student_dict).length -3) / 6) + 1; index++) {
                    const Question_ID = index.toString();
                    const Question = student_dict["Question " + index];
                    const Answer = student_dict["Answer " + index];
                    const Question_Possible_Points = student_dict["Possible Points " + index];
                    const Student_Manual_Points_For_This_Question = student_dict["Auto Score " + index];
                    const Student_Auto_Points_For_This_Question = student_dict["Manual Score " + index];
                    this.props.add_questions_scores(Student_ID, Student_Full_Name,Quiz_ID,Question_ID, Question, Answer,Question_Possible_Points, Student_Manual_Points_For_This_Question, Student_Auto_Points_For_This_Question);
                  }
                }
                else {
                  // alert user
                  //console.log(Object.keys(student_dict).length -3);
                  console.log('this data not ok');
                 // alert("Data from the file is corrupted")
                }

              }

            }
         
    }
          
        }
        >
          <br />
         <button button type="submit" className="btn btn-primary">Read File</button> 

        </form>



        <p>&nbsp;</p>
        <h2>Blackboard Question Details</h2>
        <table className="table">
          <thead>
            <tr>
             <th scope="col">ID</th>
              <th scope="col">Student ID</th>
              <th scope="col">Student Full Name</th>
              <th scope="col">Quiz ID</th>
              <th scope="col">Question ID</th>
              <th scope="col">Question</th>
              <th scope="col">Answer</th>
              <th scope="col">Question Possible Points</th>
              <th scope="col">Manual Points</th>
              <th scope="col">Auto Points</th>
              <th scope="col">Quiz Possible Points</th>
              <th scope="col">Student Score</th>
            </tr>
          </thead>
          <tbody id ="questionlist">
          { this.props.bb_question_scores.map((bbquestionscores, key) =>{
            return (
              <tr key = {key}>
              <th scope="row">{bbquestionscores._id2.toString()}</th>
              <td> {bbquestionscores._bb_student._Student_ID}</td>
              <td> {bbquestionscores._bb_student._Student_Full_Name}</td>
              <td> {bbquestionscores._bb_quiz._Quiz_ID.toString()}</td>
              <td> {bbquestionscores._bb_quiz_questions._Question_ID}</td>
              <td> {bbquestionscores._bb_quiz_questions._Question}</td>
              <td> {bbquestionscores._bb_quiz_questions._Answer}</td>
              <td> {bbquestionscores._bb_quiz_questions._Question_Possible_Points.toString()}</td>
              <td> {bbquestionscores._Student_Manual_Points_For_This_Question.toString()}</td>
              <td> {bbquestionscores._Student_Auto_Points_For_This_Question.toString()}</td>
              <td>{bbquestionscores._Quiz_Possible_Points.toString()}</td>
              <td>{bbquestionscores._Student_Total.toString()}</td>

            </tr>

            )
          })}
          </tbody>
        </table>


      </div>
    )

}
}
export default AdminDash;