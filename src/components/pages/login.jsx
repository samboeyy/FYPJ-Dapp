import React, { Component } from 'react';
import Navigation from "./Navigation";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
class LoginForm extends Component {

  render() {
    return (
      <div>
        <Navigation/>
        <div className="auth-wrapper">
        <div className="auth-inner">
        <form onSubmit={(loginevent) =>{
           loginevent.preventDefault();
           var studentaccs = this.props.student
           var lectureraccs = this.props.lecturer
           var walletacc = this.props.account
           const ID = document.getElementById('ID').value
           const address = document.getElementById('address').value

            for(var i = 0; i < studentaccs.length; i++){
                var tempstudent = studentaccs[i];
                var tempstudentid = tempstudent[1];
                var tempstudentadd = tempstudent[3];

              if(ID === tempstudentid && address === tempstudentadd && address === walletacc){
                  console.log("yes")
                  sessionStorage.setItem("ID",ID);
                  window.location = "./bbstudent";
                  return 
              }
              else{
                  console.log("Disallowed")
              }

              
            }


            for(var v = 0; v < lectureraccs.length; v++){
                var templecturer = lectureraccs[v];
                var templecturerid = templecturer[1];
                var templectureradd = templecturer[3];
     

              if(ID === templecturerid && address === templectureradd && address === walletacc){
                  console.log("yes")
                  sessionStorage.setItem("ID",ID);
                  window.location = "./admin";
                  return 
              }
              else{
                  window.location.reload();
              }

            
            }
            
           

        }}>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Login ID</label>
                <input id="ID" type="text" className="form-control" placeholder="Enter Login ID" required="required" />
            </div>

            <div className="form-group">
                <label>Wallet Address</label>
                <input id ="address" type="text" className="form-control" placeholder="Enter Wallet Address"  required="required" />
            </div>


            <button type="submit" class="btn btn-primary">Submit</button>

        </form>
                </div>
            </div>
        </div>
    );
}
  



}

export default LoginForm;
