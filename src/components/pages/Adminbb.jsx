
import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import { AdminNavigation } from '.';


class bbLecturerDash extends Component {

    constructor(){
        super();
        this.state ={
            bb: [],
            bbq: [],
            bbqonly:[],
            bbqq:[],
            bbt: [],
            bbtt: [],
            
        }
        this.addbbs = this.addbbs.bind(this);
    }

    addbbsq(allbbq){

        this.setState({bb:[allbbq]},()=>{
            //console.log(this.state.bb)
        });
        
    }

    addbbs(allbbqu){
        this.setState({bbq:[allbbqu]},()=>{
          //console.log(this.state.bbq)
        });
        
    }

    addbbqonly(allbbquest){
        this.setState({bbqonly:allbbquest},()=>{
            // console.log(allbbquest)
         });

    }
    addbbqq(bbqq){
        this.setState({bbqq:bbqq},()=>{
            // console.log(bbqq)
         });

    }


    addbbt(scorelist){
        this.setState({bbt:scorelist},()=>{
           console.log(scorelist)
        });
    }

    addbbtt(quizscorelist){
        this.setState({bbtt:quizscorelist},()=>{
          //  console.log(quizscorelist)
        });
    }

 





    
  render(){

  
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

      <div class="student" >
          <AdminNavigation/>
        <div class="container">
          <div class="row align-items-center my-0">
            {/* inputs */}
            <div class="container"> <div class=" text-center mt-5 ">
        <h2>Blackboard Lecturer Dashboard</h2>
    </div>




    <div class="row ">
        <div class="col-lg-7 mx-auto">
            <div id="blackboardform" class="card mt-2 mx-auto p-4 bg-light">
                <div class="card-body bg-light">
                    <div class="container">
                        <form onSubmit={(bbevent) =>{ 
                            bbevent.preventDefault()
                            const StudentID = document.getElementById('form_ID').value
                            const QuizID = document.getElementById('form_Quiz_ID').value
                            const QuestionID = document.getElementById('form_questID').value
                            //console.log(acc)
                       

                            var bbdb = this.props.bb_question_scores;
                            //console.log(bbdb)
                            var sum = 0;
                            var sumtotal =0;
                            var allsum =null;
                            var allsumtotal =0;
                            var oldID = 0;
                            var scorelist = [];
                            var quizscorelist = [];
                            var allbbquest =[];
                            var bbqq =[];
                            var findlength =0;
                            for(var v =0; v < bbdb.length; v++){
                                var allbb = bbdb[v];
                                //console.log(allbb)
                                // console.log(allbb[3][0])
                                var quizhex =allbb[1][0]['_hex']
                                quizhex = parseInt(quizhex,16);
                                
                                if (QuizID === quizhex.toString() && StudentID ==="" && QuestionID ===""){
                                    var allbbt = bbdb[v];
                                    allbbquest.push(allbbt)
                                    this.addbbqonly(allbbquest)
                                    //console.log(allbbquest)
                                    
                                    // console.log(allbbt);
                                    if (oldID === allbbt[2][0]){
                                        //console.log(allbbt[2][0])
                                        var allbbgrade = parseInt(allbbt['_Student_Auto_Points_For_This_Question']['_hex'],16) + parseInt(allbbt['_Student_Manual_Points_For_This_Question']['_hex'],16)
                                        var allbbtotal = parseInt(allbbt['_Quiz_Possible_Points']['_hex'],16)
                                        allsumtotal = allbbtotal
                                      //  console.log(allsumtotal)
                                        allsum = allsum + allbbgrade
                                       // console.log(allbbtotal)
                                        //console.log(allsum)
                                        quizscorelist.push(allsumtotal)
                                        scorelist.push(allsum)
                                        findlength = scorelist.length
                                        console.log(findlength)
                                        //console.log(scorelist)
                                        //console.log(scorelist)  
                                        for (var l in scorelist){
                                            l ++
                                            
                                            if (Math.trunc(l/2) !==0){
                                                if(findlength % 2 ===0){
                                                    var newlength = scorelist.length/2
                                                    console.log(newlength)
                                                }
                                                var scorelistlength = scorelist.length/newlength
                                                var newscorelist =[];
                                                var newtotallist =[];
                                                const every_nth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);
                                                newscorelist = every_nth(scorelist,scorelistlength)
                                                newtotallist = every_nth(quizscorelist,scorelistlength)
                                                var alllist =[[ 'Student Scores','Student Score, Quiz Scores']];
                                                for(var p = 0; p<newscorelist.length; p++){
                                                    var mergedlist = [];
                                                    mergedlist.push(newscorelist[p])
                                                    mergedlist.push(newtotallist[p])
                                                    alllist.push(mergedlist)


                                                }

                                               this.addbbt(alllist)
                                              // this.addbbtt(newtotallist)
                                                
                                            }
                                        
                                        }

                                    }
                                    else{
                                        oldID = allbbt[2][0];
                                        allsum =0;
                                        allbbgrade = parseInt(allbbt['_Student_Auto_Points_For_This_Question']['_hex'],16) + parseInt(allbbt['_Student_Manual_Points_For_This_Question']['_hex'],16)
                                        allbbtotal = parseInt(allbbt['_Quiz_Possible_Points']['_hex'],16)
                                        allbbtotal = allbbtotal
                                       // console.log(allbbtotal)
                                        allsum = allsum + allbbgrade
                                        scorelist.push(allsum)
                                        quizscorelist.push(allsumtotal)
                                        //console.log(allsum)
                                    }
                                }

                                if (QuizID === quizhex.toString() && QuestionID ===allbb[3][0] && StudentID ===""){
                                    var allbbqq = bbdb[v];
                                    bbqq.push(allbbqq);
                                    this.addbbqq(bbqq);
                                }
                                
                                
                                if(StudentID === allbb[2][0]){
                                        allbb = bbdb[v]
                                    if(QuizID === quizhex.toString()){
                                        var allbbq = bbdb[v]
                                       // console.log(allbbq)
                                        var bbgrade = parseInt(allbbq['_Student_Auto_Points_For_This_Question']['_hex'],16) + parseInt(allbbq['_Student_Manual_Points_For_This_Question']['_hex'],16)
                                        var bbtotal = parseInt(allbbq['_Quiz_Possible_Points']['_hex'],16)
                                        sumtotal = bbtotal
                                        sum = sum+bbgrade
                                        var subtotal = (sum/sumtotal)
                                                    if(subtotal >=0.8){
                                                        var grade = 'A';
                                                        var dict ={
                                                            studentgrade : sum,
                                                            quiztotal : sumtotal,
                                                            grades : grade,
                                                        };
                                                        this.addbbsq(dict)
                                                    }

                                                    else if (subtotal >=0.75){
                                                        grade = 'B+';
                                                        dict ={
                                                            studentgrade : sum,
                                                            quiztotal : sumtotal,
                                                            grades : grade,
                                                            
                                                        };
                                                        this.addbbsq(dict)
                                                    }
                                                    else if (subtotal >=0.7){
                                                        grade = 'B'
                                                        dict ={
                                                            studentgrade : sum,
                                                            quiztotal : sumtotal,
                                                            grades : grade,
                                                            
                                                        };
                                                        this.addbbsq(dict)
                                                    }

                                                    else if (subtotal >=0.65){
                                                        grade = 'C+'
                                                        dict ={
                                                            studentgrade : sum,
                                                            quiztotal : sumtotal,
                                                            grades : grade,
                                                            
                                                        };
                                                        this.addbbsq(dict)
                                                    }
                                                    else if (subtotal >=0.6){
                                                        grade = 'C';
                                                        dict ={
                                                            studentgrade : sum,
                                                            quiztotal : sumtotal,
                                                            grades : grade,
                                                            
                                                        };
                                                        this.addbbsq(dict)
                                                    }
                                                    else if (subtotal >=0.5) {
                                                        grade = 'D';
                                                        dict ={
                                                            studentgrade : sum,
                                                            quiztotal : sumtotal,
                                                            grades : grade,
                                                            
                                                        };
                                                        this.addbbsq(dict)

                                                    }
                                                    else{
                                                        grade = 'F';
                                                        dict ={
                                                            studentgrade : sum,
                                                            quiztotal : sumtotal,
                                                            grades : grade,
                                                            
                                                        };
                                                        this.addbbsq(dict)

                                                    }
                                        
                                        
                                        

                                        if(QuestionID === allbb[3][0]){
                                            var allbbqu =bbdb[v]
                                            this.addbbs(allbbqu)
                                            // console.log(allbbq)

                                        }
                                        else{
                                            console.log("Cant Find Question")
                                        }

                                    }
                                    else{
                                        console.log("Cant Find Quiz")
                                    }
                                
                                }
                                else{
                                    console.log("Cant Find Student")
                                }
                                
                                
                            }

                        }}>
                           
                            <div class="controls">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group"> <label for="form_ID">Student ID *</label> <input id="form_ID" type="text" class="form-control" placeholder="Please enter your Student ID " /> </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group"> <label for="form_Quiz_ID">Quiz ID </label> <input id="form_Quiz_ID" type="number" class="form-control" placeholder="Please enter the Quiz ID *" required="required" data-error="Quiz ID is required"/> </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group"> <label for="form_questID">Question ID </label> <input id="form_questID" type="number" class="form-control" placeholder="Please enter the question ID from the Quiz "/> </div>
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



 

             {/* inputs */}

             {/* table outputs */}
             <div class="container"> <div class=" text-center mt-5 ">
        <h2>Grades</h2>
    </div>
    <table className="table">
          <tbody id ="questionlist">
        
          { this.state.bb.map((bbquiz, key) =>{
            return (
           <thead>
            <tr key = {key}>
            
              <th scope="col">Quiz Possible Points</th>
              <th scope="col">Student Score</th>
              <th scope="col">Grade</th>
            </tr>
    
              <tr>
              <td>{bbquiz.quiztotal.toString()}</td>
              <td>{bbquiz.studentgrade.toString()}</td>
              <td>{bbquiz.grades}</td>

            </tr>
                    </thead>
            )
          })}

          { this.state.bbq.map((bbquestionscores, key) =>{
            return (
           <thead>
            <tr key = {key}>
            
              <th scope="col">Student ID</th>
              <th scope="col">Student Full Name</th>
              <th scope="col">Quiz ID</th>
              <th scope="col">Question ID</th>
              <th scope="col">Question</th>
              <th scope="col">Answer</th>
              <th scope="col">Question Possible Points</th>
              <th scope="col">Manual Score</th>
              <th scope="col">Auto Score</th>
            </tr>
    
              <tr>
              <td> {bbquestionscores._bb_student._Student_ID}</td>
              <td> {bbquestionscores._bb_student._Student_Full_Name}</td>
              <td> {bbquestionscores._bb_quiz._Quiz_ID.toString()}</td>
              <td> {bbquestionscores._bb_quiz_questions._Question_ID}</td>
              <td> {bbquestionscores._bb_quiz_questions._Question}</td>
              <td> {bbquestionscores._bb_quiz_questions._Answer}</td>
              <td> {bbquestionscores._bb_quiz_questions._Question_Possible_Points.toString()}</td>
              <td> {bbquestionscores._Student_Manual_Points_For_This_Question.toString()}</td>
              <td> {bbquestionscores._Student_Auto_Points_For_This_Question.toString()}</td>
              
           

            </tr>
                    </thead>
            )
          })}


            { this.state.bbqonly.map((bbquestionscores, key) =>{
            return (
           <thead>
            <tr key = {key}>
            
              <th scope="col">Student ID</th>
              <th scope="col">Student Full Name</th>
              <th scope="col">Quiz ID</th>
              <th scope="col">Question ID</th>
              <th scope="col">Question</th>
              <th scope="col">Answer</th>
              <th scope="col">Question Possible Points</th>
              <th scope="col">Manual Score</th>
              <th scope="col">Auto Score</th>
            </tr>
    
              <tr>
              <td> {bbquestionscores._bb_student._Student_ID}</td>
              <td> {bbquestionscores._bb_student._Student_Full_Name}</td>
              <td> {bbquestionscores._bb_quiz._Quiz_ID.toString()}</td>
              <td> {bbquestionscores._bb_quiz_questions._Question_ID}</td>
              <td> {bbquestionscores._bb_quiz_questions._Question}</td>
              <td> {bbquestionscores._bb_quiz_questions._Answer}</td>
              <td> {bbquestionscores._bb_quiz_questions._Question_Possible_Points.toString()}</td>
              <td> {bbquestionscores._Student_Manual_Points_For_This_Question.toString()}</td>
              <td> {bbquestionscores._Student_Auto_Points_For_This_Question.toString()}</td>
              
           

            </tr>
                    </thead>
            )
          })}


      { this.state.bbqq.map((bbquestionscores, key) =>{
            return (
           <thead>
            <tr key = {key}>
            
              <th scope="col">Student ID</th>
              <th scope="col">Student Full Name</th>
              <th scope="col">Quiz ID</th>
              <th scope="col">Question ID</th>
              <th scope="col">Question</th>
              <th scope="col">Answer</th>
              <th scope="col">Question Possible Points</th>
              <th scope="col">Manual Score</th>
              <th scope="col">Auto Score</th>
            </tr>
    
              <tr>
              <td> {bbquestionscores._bb_student._Student_ID}</td>
              <td> {bbquestionscores._bb_student._Student_Full_Name}</td>
              <td> {bbquestionscores._bb_quiz._Quiz_ID.toString()}</td>
              <td> {bbquestionscores._bb_quiz_questions._Question_ID}</td>
              <td> {bbquestionscores._bb_quiz_questions._Question}</td>
              <td> {bbquestionscores._bb_quiz_questions._Answer}</td>
              <td> {bbquestionscores._bb_quiz_questions._Question_Possible_Points.toString()}</td>
              <td> {bbquestionscores._Student_Manual_Points_For_This_Question.toString()}</td>
              <td> {bbquestionscores._Student_Auto_Points_For_This_Question.toString()}</td>
              
           

            </tr>
                    </thead>
            )
          })}


          </tbody>
        </table>
    
 </div>



            {/* table outputs */}

           {/* graph output */}

           <div class="container"> <div class=" text-center mt-5 ">
        <h2>Charts</h2>
    </div>

     <div class="row ">
         <div class="col-lg-7 mx-auto">
             
             
                     <div class="container">
          
                
                     <Chart
                    width={'600px'}
                    height={'400px'}
                    chartType="ScatterChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.bbt}
                    options={{
                        title: 'Grade Comparison',
                        hAxis: { title: 'Student Score', minValue: 0, maxValue: 20 },
                        vAxis: { title: 'Quiz Score', minValue: 0, maxValue: 20},
                        legend: 'none',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                 />
                
                    

                     </div>
               
    
         </div>
     </div>
 </div>




           {/* graph output */}



          </div>
        </div>
      </div>
    );
  }

}

export default bbLecturerDash;