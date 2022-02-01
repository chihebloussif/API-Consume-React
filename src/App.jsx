import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import AddIcon from '@mui/icons-material/Add';
import { MinimizeOutlined } from '@mui/icons-material';

function App() {

  const [students, setStudents] = useState([]);
  const [showGrades,setShowGrades] = useState(false);
  const [filter,setFilter] = useState('');

  const apiURL = "https://api.hatchways.io/assessment/students";
  const fetchStudents = async () => {
    await axios.get(apiURL).then(response => {
      setStudents(response.data); 
    });
  }

  const searchInput = (e) => {
    setFilter(e.target.value)
  }

  let studentSearch = students.students?.filter(student=> {
    return Object.keys(student).some(key=>
      student[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
  });

  useEffect(() => {
    fetchStudents();
  }, []);
  

  return (
    <div className="App">
        <div className="mainContainer"> 
         <input type="text" placeholder='Search by name' value={filter} onChange={searchInput.bind(this)} className='search'/>
          {studentSearch?.map(student => (
            <div key={student.id}>
              <hr className='ligneDeviderStart' />
              <div className="studentContainer">
                <img src={student.pic} alt="" className="studentPic" />
                <div className="studentInfos">
                  <div className="studentFullName">
                    <span className="studentLastName">{student.lastName}</span>
                    <span className="studentFirstName">{student.firstName}</span>
                  </div>
                  <div className="studentItemsInfos">
                    <div className="studentEmail">
                      Email: {student.email}
                    </div>
                    <div className="studentCompany">
                      Company: {student.company}
                    </div>
                    <div className="studentSkill">
                      Skill: {student.skill}
                    </div>
                    <div className="studentAverage">
                      Average: {student.grades.map(Number).reduce((a, b) => a + b) / student.grades.length} %
                    </div>
                    {
                      showGrades ?
                      <div className="studentGrades">
                      <div className="test1">test 1 :   {student.grades[0]}%</div>
                      <div className="test2">test 2 :   {student.grades[1]}%</div>
                      <div className="test3">test 3 :   {student.grades[2]}%</div>
                      <div className="test4">test 4 :   {student.grades[3]}%</div>
                      <div className="test5">test 5 :   {student.grades[4]}%</div>
                      <div className="test6">test 6 :   {student.grades[5]}%</div>
                      <div className="test7">test 7 :   {student.grades[6]}%</div>
                      <div className="test8">test 8 :   {student.grades[0]}%</div>
                    </div>  
                     : null
                    }    
                  </div>
                </div>
                <div className="extendInfos">
                  {
                    !showGrades ?
                      <AddIcon className='icon' onClick={(e)=> setShowGrades(!showGrades)}/>
                    : <MinimizeOutlined className='icon' onClick={(e)=> setShowGrades(!showGrades)} />
                  } 
                </div>
              </div>
            </div>
          ))}      
        </div>
        
    </div>
  );
}

export default App;
