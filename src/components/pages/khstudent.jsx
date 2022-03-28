
import React, { Component } from 'react';
import { StudentNavigation } from '.';


class khstudentdash extends Component {

  constructor(){
    super();

    this.state ={
        kh: [],
        khq: [],
        
    }
    this.addkhsq = this.addkhsq.bind(this);
    this.addkhs = this.addkhs.bind(this);
}

addkhsq(khdbbb){

    this.setState({kh:[khdbbb]},()=>{
        //console.log(this.state.kh)
    });
    
}

addkhs(khdbba){

    this.setState({khq:[khdbba]},()=>{

      //console.log(this.state.khq)
    });
    
}


  render(){

    var loginID = sessionStorage.getItem("ID");
    if (loginID === null){
      alert("Please Login")
        window.location = "./login";
    }


    return (
      <div class="student">
          <StudentNavigation/>
        <div class="container">
          <div class="row align-items-center my-0">
            {/* inputs */}
            <div class="container"> 
                <div class=" text-center mt-5 ">
                    <h2>Kahoot Dashboard</h2>
                </div>

                <div class="row ">
                    <div class="col-lg-7 mx-auto">

                        <div id="kahootform" class="card mt-2 mx-auto p-4 bg-light">
                            <div class="card-body bg-light">
                                <div class="container">
                                    
                                    <form onSubmit={(khevent) => {
                                        khevent.preventDefault();
                                        const Student_ID = document.getElementById('form_ID').value
                                        const Kahoot_ID = document.getElementById('form_Quiz_ID').value
                                        const Question_ID = document.getElementById('form_questID').value
                                        
                                        
                                        // List of dictionaries
                                        var allData = this.props.kahoot_overall

                                        // Student stuff
                                        var studAcc = this.props.student

                                        var Acct = this.props.account
                                        //console.log(Acct)

                                        
                                        for (var i=0; i<studAcc.length; i++) {
                                                                                        
                                            var tempSData = studAcc[i];
                                            //console.log(tempSData)

                                            if (Student_ID === tempSData[1]) { // && Acct === tempSData[3]) {
                                                //console.log("yes")
                                                var khdb = this.props.kahoot_overall
                                                //console.log(khdb)

                                                for (var j=0; j<khdb.length; j++) {
                                                    var khdbb = khdb[j]
                                                    var convt = parseInt(khdbb[2], 16);
                                                    if(Student_ID === khdbb[1][0]){
                                                        if (Kahoot_ID === convt.toString()) {
                                                            var khdbbb = khdb[j]
                                                            //console.log(khdbbb[1][0])
                                                            
                                                            this.addkhsq(khdbbb)

                                                            
                                                            if (Question_ID === khdbbb[3][0]) {
                                                                var khdbba = khdb[j]
                                                                //console.log(khdbba)

                                                                this.addkhs(khdbba)

                                                            }
                                                        }

                                                            


                                                    }

                                                            
                                                            //console.log("yes")
                                                }
                                                    
                                                                                            
                                                    
                                                
                                                

                                            }
                                            else {
                                                //console.log("WRONG")
                                            }
                                            // check if student ID(input) === the one in the student
                                            // check if the 
                                            

                                        }

                                    

                                    }}>
                                        <div class="controls">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group"> 
                                                        <label for="form_ID">Student ID</label>
                                                            <input id="form_ID" 
                                                                    type="text" 
                                                                    ref = {(input)=>{this.form_ID = input}}
                                                                    class="form-control" 
                                                                    placeholder="Please enter Student ID" 
                                                                    required="required" 
                                                                    data-error="Student ID is required."/> 
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-group"> 
                                                        <label for="form_Quiz_ID">Kahoot Quiz ID</label> 
                                                            <input id="form_Quiz_ID" 
                                                                    type="text"
                                                                    ref = {(input)=>{this.form_Quiz_ID = input}} 
                                                                    class="form-control" 
                                                                    placeholder="Please enter Quiz ID" 
                                                                    required="required" 
                                                                    data-error="Quiz ID is required"/> 
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group"> 
                                                        <label for="form_questID">Kahoot Question ID (optional)</label> 
                                                            <input id="form_questID" 
                                                                    type="text"
                                                                    ref = {(input)=>{this.form_questID = input}} 
                                                                    class="form-control" 
                                                                    placeholder="Please enter Question ID" 
                                                                    data-error="Question ID is wrong"/> 
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                            
                                                <div class="col-md-12"> <input type="submit" class="btn btn-success btn-send pt-2 btn-block " value="Submit"/> </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>



            <form>


            </form>



            {/* inputs */}

             {/* table outputs */}

            <div class="container"> 
                <div class=" text-center mt-5 ">
                    <h2> Student Kahoot Marks </h2>
                </div>
                <div class="col-lg-15 mx-auto">
                        <div class="card mt-2 mx-auto p-4 bg-light">
                            <div class="card-body bg-light">
                                <div class="container">
                                    <table className="table">
                                        
                                        <thead>
                                            <tr>
                                            <th scope="col">Student ID</th>
                                            <th scope="col">Kahoot Quiz ID</th>
                                            <th scope="col">Kahoot Question ID</th>
                                            <th scope="col">Kahoot Question</th>
                                            <th scope="col">Time Allocated (seconds)</th>
                                            <th scope="col">Time Took (seconds)</th>
                                            <th scope="col">Student Kahoot Score</th>
                                            <th scope="col">Student Total Kahoot Score</th>
                                            </tr>
                                        </thead>   
                                        <tbody id ="questionlist">

                                    
                                        { this.state.kh.map((kahootoverall, key) =>{
                                        
                                            return (
                                            <tr key = {key}>
                                            <td> {kahootoverall._kahoot_student._Student_ID}</td>
                                            <td> {kahootoverall._kahoot_quiz._Kahoot_ID.toString()}</td>
                                            <td> {kahootoverall._kahoot_question._Question_ID}</td>
                                            <td> {kahootoverall._kahoot_question._Question}</td>
                                            <td> {kahootoverall._kahoot_question._Time_Allocated.toString()}</td>
                                            <td> {kahootoverall._Time_Took.toString()}</td>
                                            <td> {kahootoverall._Score.toString()}</td>
                                            <td> {kahootoverall._TotalSScore.toString()}</td>

                                            </tr>

                                            )
                                        })}
                                        
                                        { this.state.khq.map((kahootoverall, key) =>{
                                        
                                            return (
                                            <tr key = {key}>
                                            <td> {kahootoverall._kahoot_student._Student_ID}</td>
                                            <td> {kahootoverall._kahoot_quiz._Kahoot_ID.toString()}</td>
                                            <td> {kahootoverall._kahoot_question._Question_ID}</td>
                                            <td> {kahootoverall._kahoot_question._Question}</td>
                                            <td> {kahootoverall._kahoot_question._Time_Allocated.toString()}</td>
                                            <td> {kahootoverall._Time_Took.toString()}</td>
                                            <td> {kahootoverall._Score.toString()}</td>
                                            <td> {kahootoverall._TotalSScore.toString()}</td>

                                            </tr>

                                            )
                                        })}
                                        </tbody>
                                        

                                    {/*
                                        { this.state.khq.map((kahootoverall, key2) =>{
                                        
                                            return (
                                            <tr key = {key2}>
                                            <td> {kahootoverall._kahoot_student._Student_ID}</td>
                                            <td> {kahootoverall._kahoot_quiz._Kahoot_ID.toString()}</td>
                                            <td> {kahootoverall._kahoot_question._Question_ID}</td>
                                            <td> {kahootoverall._kahoot_question._Question}</td>
                                            <td> {kahootoverall._kahoot_question._Time_Allocated.toString()}</td>
                                            <td> {kahootoverall._Time_Took.toString()}</td>
                                            <td> {kahootoverall._Score.toString()}</td>
                                            <td> {kahootoverall._TotalSScore.toString()}</td>

                                            </tr>

                                            )
                                        })} */}
                                        
                                        </table>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
     
          </div>
        </div>
    );
  }
  

}
export default khstudentdash;