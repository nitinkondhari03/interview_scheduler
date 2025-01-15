import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Create.css";
import { useDispatch } from "react-redux";
import { addBooking, updateBooking } from "../redux/bookingsSlice";
import { useParams } from "react-router-dom";
const Edit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    candidate_name: "",
    interviewer_name: "",
    Date: "",
    time: "",
    interview_type: "",
  });
  const fetchgetid = async () => {
    try {
      const response = await fetch(
        `https://66ab8757636a4840d7cb10b6.mockapi.io/interview_Scheduler/${id}`
      );
      const dataResponse = await response.json();
      setData({
        candidate_name: dataResponse.candidate_name,
        interviewer_name: dataResponse.interviewer_name,
        Date: dataResponse.Date,
        time: dataResponse.time,
        interview_type: dataResponse.interview_type,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchgetid();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleupdate = async (e) => {
    e.preventDefault();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = new Date(`${year}-${month}-${day}`);
    const previousDate = new Date(data.Date);
    if (formattedDate > previousDate) {
      return alert("Booking date is expired. Please select a future date.");
    }
    dispatch(updateBooking({ id, data }));
    alert("Booking Interview Update Successfully")
    navigate("/");
  };
  const handlehome=()=>{
    navigate("/")
  }
  return (
    <>
      <div className="main-div">
      <div className="backtohome">
        <button onClick={handlehome}>Back to Home</button>
        </div>
        <div className="form-container">
          <h2 className="form-title">Booking Interview Edit</h2>
          <form className="form" onSubmit={handleupdate}>
            <div className="form-group">
              <label htmlFor="candidate_name">Candidate Name : </label>
              <input
                required
                type="text"
                placeholder="Enter Candidate Name"
                name="candidate_name"
                value={data.candidate_name}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Interviewer Name :</label>
              <input
                required
                type="text"
                placeholder="Enter Interviewer Name"
                name="interviewer_name"
                value={data.interviewer_name}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Interview Date :</label>
              <input
                required
                type="Date"
                placeholder="Enter Date"
                name="Date"
                value={data.Date}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Interview Time :</label>
              <input
                required
                type="time"
                placeholder="Enter Time"
                name="time"
                value={data.time}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Interview Type :</label>
              <select
                required
                className="selecttype"
                name="interview_type"
                value={data.interview_type}
                onChange={handleOnChange}
              >
                <option value="">Select Interview Type</option>
                <option value={"Technical"}>Technical</option>
                <option value={"HR"}>HR</option>
                <option value={"Behavioral"}>Behavioral</option>
              </select>
            </div>

            <button type="submit" style={{backgroundColor:"rgb(8, 102, 8)"}} className="form-button">
              Update Booking
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
