
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./openzeppelin-contracts-4.1.0/openzeppelin-contracts-4.1.0/contracts/access/Ownable.sol";
import "./openzeppelin-contracts-4.1.0/openzeppelin-contracts-4.1.0/contracts/utils/math/SafeMath.sol";

contract fyp_contract is Ownable {

    struct Lecturer {
        uint _Lecturercount;
        string _Lecturer_ID;
        string _Lecturer_Full_Name;
        address _Lecturer_Address;
    }

    struct Student{
        uint _Studentcount;
        string _Student_ID;
        string _Student_Full_Name;
        address _Student_Address;
    }



    // Kahoot
    struct Kahoot_Quiz {
        uint _Kahoot_ID;
    }
    
    struct Kahoot_Student {
        string _Student_ID;
    }

    struct Kahoot_Question {
        string _Question_ID;
        string _Question;
        uint _Time_Allocated;
    }

    struct Kahoot_Overall {
        uint _id1;
        Kahoot_Student _kahoot_student;
        Kahoot_Quiz _kahoot_quiz;
        Kahoot_Question _kahoot_question;
        uint _Time_Took;
        uint _Score;
        uint _TotalSScore;
    }
    
    
    
    
    // Blackboard
    struct BB_Quiz {
        uint _Quiz_ID;
    }
    
    struct BB_Student {
        string _Student_ID;
        string _Student_Full_Name;
    }

    struct BB_Quiz_Questions {
        string _Question_ID;
        string _Question; 
        string _Answer;
        uint _Question_Possible_Points;
    }

    struct BB_Question_Scores {
        uint _id2;
        BB_Quiz _bb_quiz;
        BB_Student _bb_student;
        BB_Quiz_Questions _bb_quiz_questions;
        uint _Student_Manual_Points_For_This_Question;
        uint _Student_Auto_Points_For_This_Question;
        uint _Quiz_Possible_Points;
        uint _Student_Total;
        
    }


    //student and lecturer
    mapping(uint => Student) public student;
    uint public student_count = 0;
    mapping(uint => Lecturer) public lecturer;
    uint public lecturer_count = 0;
    
    // Kahoot Mappings
    mapping(uint => Kahoot_Quiz) public kahoot_quiz;
    
    mapping(string => Kahoot_Student) public kahoot_student;
    
    uint public kahoot_quiz_count = 1;
    mapping(uint => Kahoot_Question) public kahoot_question;
    uint public kahoot_question_count = 1;
    mapping(uint => Kahoot_Overall) public kahoot_overall;
    uint public time_taken_count = 0;
    
    // Blackboard Mappings
    mapping(uint => BB_Quiz) public bb_quiz;
    uint public bb_quiz_count = 1;
    
    mapping (string => BB_Student) public bb_student;
    
    mapping(uint => BB_Quiz_Questions) public bb_quiz_questions;
    uint public count = 0;
    
    mapping(uint => BB_Question_Scores) public  bb_question_scores;
    uint public bb_question_count = 0;
    
    //uint public quiz_count = 0;
    //mapping(uint => Student_Quiz_Total) public  student_quiz_total;
    
    
    
    //address public owner;
    
    //modifier onlyOwner() {
    //    require(msg.sender == owner, 'Only owner');
    //    _;
    //}

    
    //constructor() {
    //    owner = msg.sender;
    //}

    // access control
    //function theOwner() public view returns (address) {
    //    return owner;
    //}
    

    function addstudent(string memory Student_ID, string memory Student_Full_Name, address Student_Address) internal{
        student_count ++;
        student[student_count] = Student(student_count,Student_ID, Student_Full_Name, Student_Address);
        
    }
    
    function addlecturer(string memory Lecturer_ID, string memory Lecturer_Full_Name, address Lecturer_Address) internal{
        lecturer_count ++;
        lecturer[lecturer_count] = Lecturer(lecturer_count ,Lecturer_ID, Lecturer_Full_Name,Lecturer_Address);
        
    }

    constructor () public {
        //lecturer
        addlecturer("999999A", "testlecturer",0x8BB46862Ddc73E18e0eBe52AA134F58f485f9bd0); //address change according to blockchain
        
        //students
        addstudent("123456A", "testuser1",0x455B499f929F87F3A4903F8DfbDFb82DAe747d17); //address change according to blockchain
        addstudent("123456B", "testuser2",0xC75779394f6C50070bBE179EfD57Eab0ae22c431); //address change according to blockchain
      //  addstudent("123456C", "testuser3");
       // addstudent("123456D", "testuser4");
      //  addstudent("123456E", "testuser5");
     //   addstudent("123456F", "testuser6");
      //  addstudent("123456G", "testuser7");
      //  addstudent("123456H", "testuser8");
     //   addstudent("123456I", "testuser9");
        
        //Kahoot
        
        //bb
        
    }
    

    

    
    
    
    
    // Kahoot stuff
    function addKahoot(string memory Student_ID, uint Kahoot_ID, string memory Question_ID, string memory Question, uint Time_Allocated, uint Time_Took, uint Score) public onlyOwner {
      // kahoot_quiz[Kahoot_ID] = Kahoot_Quiz(Kahoot_ID,Question_ID, Question, Time_Allocated, Score_Allocated);
       //student[Student_ID] = Student(Student_ID, Student_Full_Name);

       time_taken_count ++;
       
       require(Time_Took < Time_Allocated && bytes(Student_ID).length == 7);
       
       fyp_contract.Kahoot_Student memory newstudent = Kahoot_Student(Student_ID);
       fyp_contract.Kahoot_Quiz memory newkahootquiz = Kahoot_Quiz(Kahoot_ID);
       fyp_contract.Kahoot_Question memory newkahootquestion = Kahoot_Question(Question_ID, Question, Time_Allocated);
       
       
       for(uint a = 0; a < time_taken_count; a ++){
        
        string memory Student_ID_encodeK = kahoot_overall[a]._kahoot_student._Student_ID;

        if (Kahoot_ID == kahoot_overall[a]._kahoot_quiz._Kahoot_ID && keccak256(bytes(Student_ID)) == keccak256(bytes(Student_ID_encodeK))) {
           
           uint TotalSScore = kahoot_overall[a]._TotalSScore;
           TotalSScore = Score + TotalSScore;
           
           kahoot_overall[time_taken_count] = Kahoot_Overall(time_taken_count, newstudent, newkahootquiz, newkahootquestion, Time_Took, Score, TotalSScore); 
       
           }   
               
        else {
           uint TotalSScore = 0;
           
           TotalSScore = Score + TotalSScore;           
           
           kahoot_overall[time_taken_count] = Kahoot_Overall(time_taken_count, newstudent, newkahootquiz, newkahootquestion, Time_Took, Score, TotalSScore); 
           }
           
       }
    }
    
    
    // Blackboard stuff
    function add_questions_scores(string memory Student_ID, string memory Student_Full_Name, uint Quiz_ID , string memory QuestioN_ID, string memory QuestioN, string memory Answer, uint Question_Possible_Points, uint Student_Manual_Points_For_This_Question, uint Student_Auto_Points_For_This_Question) public onlyOwner {


       count ++;

       fyp_contract.BB_Quiz memory newquiz = BB_Quiz(Quiz_ID);
       fyp_contract.BB_Student memory newstudent = BB_Student(Student_ID, Student_Full_Name);
       fyp_contract.BB_Quiz_Questions memory newquestion = BB_Quiz_Questions(QuestioN_ID, QuestioN, Answer, Question_Possible_Points);

       for(uint i = 0; i < count; i ++){
        
        string memory Student_ID_encode = bb_question_scores[i]._bb_student._Student_ID;
           
        if (Quiz_ID == bb_question_scores[i]._bb_quiz._Quiz_ID && keccak256(bytes(Student_ID)) == keccak256(bytes(Student_ID_encode))) {
           uint Student_Total = bb_question_scores[i]._Student_Total;
           Student_Total = ( Student_Total + Student_Manual_Points_For_This_Question + Student_Auto_Points_For_This_Question);
           
           uint Quiz_Possible_Points = bb_question_scores[i]._Quiz_Possible_Points;
           Quiz_Possible_Points = (Quiz_Possible_Points + Question_Possible_Points);
           
           bb_question_scores[count] = BB_Question_Scores(count, newquiz, newstudent, newquestion, Student_Manual_Points_For_This_Question, Student_Auto_Points_For_This_Question, Quiz_Possible_Points,Student_Total); 
       }
       else{
           uint Student_Total = 0;
           Student_Total = ( Student_Total + Student_Manual_Points_For_This_Question + Student_Auto_Points_For_This_Question);
           
           uint Quiz_Possible_Points = 0;
           Quiz_Possible_Points = (Quiz_Possible_Points + Question_Possible_Points);
           
            bb_question_scores[count] = BB_Question_Scores(count, newquiz, newstudent, newquestion, Student_Manual_Points_For_This_Question, Student_Auto_Points_For_This_Question, Quiz_Possible_Points, Student_Total); 
       }
           
       }
    }


    


}