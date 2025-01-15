import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Create.css";
import { useDispatch, useSelector } from "react-redux";
import { addBooking, fetchBookings } from "../redux/bookingsSlice";
import { useEffect } from "react";
const Create = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.bookings);
  const navigate = useNavigate();
  const [data, setData] = useState({
    candidate_name: "",
    interviewer_name: "",
    Date: "",
    time: "",
    interview_type: "",
  });
  useEffect(() => {
    dispatch(fetchBookings());
  }, []);
  const handleOnChange = (e) => {
    console.log(items);
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let i = 0; i<items.length; i++) {
      if (
        items[i].candidate_name == data.candidate_name
        
      ) {
        console.log(items.length,data.candidate_name)
        return alert("Already Booked Interview same interviewer and same candidate")
      }
    }
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = new Date(`${year}-${month}-${day}`);
    const previousDate = new Date(data.Date);
    if (formattedDate > previousDate) {
      return alert("Booking date is expired. Please select a future date.");
    }
    dispatch(addBooking(data));
    navigate("/");
  };
  const handlehome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="main-div">
        <div className="backtohome">
          <button onClick={handlehome}>Back to Home</button>
        </div>
        <div className="form-container">
          <h2 className="form-title">Booking Interview</h2>
          <form className="form" onSubmit={handleSubmit}>
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

            <button type="submit" className="form-button">
              Booking
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
