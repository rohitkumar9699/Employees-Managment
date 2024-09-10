import React, { useState } from 'react';
import { city } from './city'; // Importing 'city' correctly
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import UploadImage from './UploadImage';

function AddEmployee() {
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [st, setSt] = useState('');
  const [dt, setDt] = useState('');
  const [ct, setCt] = useState('');
  
  const statefun = () => {
    let all = city.cities.map(item => item.State);
    let unique = [...new Set(all)];
    unique.sort();
    return unique.map((val, index) => (
      <option key={index} value={val}>{val}</option>
    ));
  };

  const fundist = (str) => {
    let all = city.cities
      .filter(item => item.State === str)
      .map(item => item.District);

    let unique = [...new Set(all)];
    unique.sort();

    setDistricts(unique.map((val, index) => (
      <option key={index} value={val}>{val}</option>
    )));
  };

  const fundcity = (str) => {
    let all = city.cities
      .filter(item => item.District === str)
      .map(item => item.City);

    let unique = [...new Set(all)];
    unique.sort();

    setCities(unique.map((val, index) => (
      <option key={index} value={val}>{val}</option>
    )));
  };

  const depart = [
    "Human Resources",
    "Engineering",
    "Sales",
    "Marketing",
    "Finance",
    "Customer Support",
    "Research and Development",
    "Information Technology"
  ];

  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const [dateOfJoining, setdateOfJoining] = useState('');
  const [department, setDepartment] = useState('');
  const [employmentStatus, setemploymentStatus] = useState('');
  const [marital, setMarital] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState({
    state: '',
    district: '',
    city: ''
  });

  function submitHandle(e) {
    e.preventDefault(); // Prevent page reload
    if (!name || !phone || !dateOfBirth || !dateOfJoining || !department || !employmentStatus || !marital || !gender || !address.state || !address.district || !address.city) {
      alert("Please fill in all required fields before submitting.");
      return;
    }
    axios
      .post("http://localhost:5000/create", {
        name, phone, dateOfBirth, dateOfJoining, department, employmentStatus, marital, gender, address
      })
      .then((result) => {
        console.log(result);
        navigate('/'); // Redirect
      })
      .catch((error) => {
        console.error("There was an error!", error); // Handle error
      });
  }

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSt(selectedState);
    setAddress((prev) => ({ ...prev, state: selectedState }));
    fundist(selectedState); // Load districts for selected state
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDt(selectedDistrict);
    setAddress((prev) => ({ ...prev, district: selectedDistrict }));
    fundcity(selectedDistrict); // Load cities for selected district
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCt(selectedCity);
    setAddress((prev) => ({ ...prev, city: selectedCity }));
  };

  
  
  return (
    <div className='add'>
      <form onSubmit={submitHandle} className='add_emp'>
        
        <label style={{ fontSize: "30px", fontWeight: "800", textAlign: "center", textShadow: "2px 2px 4px red" }} htmlFor="">
          Add Employee Details
        </label>

        <label htmlFor="name">Enter your Name</label>
        <input onChange={(e) => setName(e.target.value)} type="text" id="name" />

        <label htmlFor="phone">Enter your Phone</label>
        <input
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          id="phone"
          maxLength="10"
          pattern="[0-9]{10}"
          required
        />


        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input onChange={(e) => setdateOfBirth(e.target.value)} type="date" id="dateOfBirth" />

        <label htmlFor="dateOfJoining">Date of Joining</label>
        <input onChange={(e) => setdateOfJoining(e.target.value)} type="date" id="dateOfJoining" />

        <div>
          <label>Select Employee Department</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} name="department">
            <option value="select-Department">Select Department</option>
            {depart.map((val, index) => (
              <option key={index} value={val}>{val}</option>
            ))}
          </select>
        </div>

        <label>Employment Status</label>
        <div>
          <input type="radio" id="full-time" name="employmentStatus" value="Full-time" onChange={(e) => setemploymentStatus(e.target.value)} checked={employmentStatus === "Full-time"} />
          <label htmlFor="full-time">Full-time</label>

          <input type="radio" id="part-time" name="employmentStatus" value="Part-time" onChange={(e) => setemploymentStatus(e.target.value)} checked={employmentStatus === "Part-time"} />
          <label htmlFor="part-time">Part-time</label>

          <input type="radio" id="contract" name="employmentStatus" value="Contract" onChange={(e) => setemploymentStatus(e.target.value)} checked={employmentStatus === "Contract"} />
          <label htmlFor="contract">Contract</label>
        </div>

        <label>Marital Status</label>
        <div>
          <input onChange={(e) => setMarital(e.target.value)} type="radio" id="true" name="Marital" value="True" />
          <label htmlFor="true">True</label>

          <input onChange={(e) => setMarital(e.target.value)} type="radio" id="false" name="Marital" value="False" />
          <label htmlFor="false">False</label>
        </div>

        <label>Gender</label>
        <div>
          <input onChange={(e) => setGender(e.target.value)} type="radio" id="male" name="gender" value="Male" />
          <label htmlFor="male">Male</label>

          <input onChange={(e) => setGender(e.target.value)} type="radio" id="female" name="gender" value="Female" />
          <label htmlFor="female">Female</label>
        </div>

        <label>Select your Address</label>
        <div>
          <select name="State" value={st} onChange={handleStateChange}>
            <option value="select-state">Select State</option>
            {statefun()}
          </select>

          <select name="District" value={dt} onChange={handleDistrictChange}>
            <option value="select-districts">Select District</option>
            {districts}
          </select>

          <select name="City" value={ct} onChange={handleCityChange}>
            <option value="select-cities">Select City</option>
            {cities}
          </select>
        </div>
        <UploadImage/>
        <button id='submit' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddEmployee;
