import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [employees, setEmployees] = useState([]); // For storing fetched employee data
  const [data, setData] = useState([]); // For storing data to display in the table (filtered or full list)
  const [search, setSearch] = useState(''); // For storing the search input
  const [searchBy, setSearchBy] = useState('id'); // For storing the field by which to search (id, name, phone)

  // Fetch employees data from the backend
  useEffect(() => {
    axios.get("http://localhost:5000")
      .then(result => {
        console.log(result.data);
        setEmployees(result.data); // Set fetched employee data
        setData(result.data); // Initialize the table with the full list of employees
      })
      .catch(err => console.log(err)); // Log any errors
  }, []);

  // *********** searchHandle ************** //
  function searchHandle(event) {
    event.preventDefault(); // Prevent page reload on form submission
    
    // Apply filtering based on search input and searchBy criteria
    const filteredEmployees = employees.filter((employee) => {
      if (searchBy === 'id') {
        return employee.employeeId.toLowerCase().includes(search.toLowerCase());
      } else if (searchBy === 'name') {
        return employee.name.toLowerCase().includes(search.toLowerCase());
      } else if (searchBy === 'phone') {
        return String(employee.phone).includes(search);
      }
      return false;
    });

    setData(filteredEmployees); // Update data state with filtered results
  }

  return (
    <div className="main">
      <h1>Employees Records</h1>
      
      <div className='heading'>
        <Link className='btn' style={{ marginRight: "30%" }} to={`/create`}>Add New Employee</Link>
        
        <form onSubmit={searchHandle}>
          <input 
            onChange={(e) => setSearch(e.target.value)} 
            type="text" 
            placeholder="Search employees" 
          />
          <button style={{ marginLeft: "10px", padding: "5px", marginTop: "2px" }}>Search</button>

          <div>
            <input 
              onChange={(e) => setSearchBy(e.target.value)} 
              type="radio"  
              name="Search" 
              value="id" 
              defaultChecked 
            />
            <label> By Employee ID </label>
            
            <input 
              onChange={(e) => setSearchBy(e.target.value)} 
              type="radio"  
              name="Search" 
              value="name" 
            />
            <label> By Name </label>
            
            <input 
              onChange={(e) => setSearchBy(e.target.value)} 
              type="radio"  
              name="Search" 
              value="phone" 
            />
            <label> By Phone</label>
          </div>
        </form>
      </div>

      <div className="table-out">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, idx) => (
              <tr key={employee._id}>
                <td>{idx + 1}</td>
                <td>{employee.name}</td>
                <td>
                  <Link className='rk' to={`/viewdetail/${employee.employeeId}`} style={{ textDecoration: "none"}}>
                    {employee.employeeId}
                  </Link>
                </td>

                <td>{employee.department}</td>
                <td>{employee.phone}</td>
                <td>
                  <Link className='btn' to={`/update/${employee.employeeId}`}>Update</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
