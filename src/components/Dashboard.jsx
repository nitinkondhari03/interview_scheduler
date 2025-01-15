import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/Dashboard.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { deleteBooking, fetchBookings } from "../redux/bookingsSlice";
import { useDispatch, useSelector } from "react-redux";
const Dashboard = () => {
  const dispatch = useDispatch();
  const localizer = momentLocalizer(moment);
  const [alldata, setAlldata] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [getid, setgetid] = useState("");
  const { items, status, error } = useSelector((state) => state.bookings);
  const navigates = useNavigate();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function closeModal() {
    setIsOpen(false);
  }

  const handleSelectEvent = async ({ id }) => {
    setIsOpen(true);
    setgetid(id);
    // try {
    //   const dataResponse = await fetch(
    //     `https://66ab8757636a4840d7cb10b6.mockapi.io/interview_Scheduler/${id}`,
    //     {
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       method: "DELETE",
    //     }
    //   );

    //   const dataApi = await dataResponse.json();
    //   console.log(dataApi);
    //   alert("Data deleted Successfull");
    //   fetchAlldata();
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const handledelete = async (e) => {
    e.preventDefault();
    dispatch(deleteBooking(getid));
    alert("interview cancel successfully");
    navigates(0);
  };
  const fetchAlldata = async () => {
    const response = await fetch(
      "https://66ab8757636a4840d7cb10b6.mockapi.io/interview_Scheduler"
    );
    const dataResponse = await response.json();
    console.log(dataResponse);
    let obj = [];

    for (let i = 0; i < dataResponse.length; i++) {
      let newdata = {
        id: dataResponse[i].id,
        title: `${dataResponse[i].interview_type} ${" "} interview`,
        start: moment(dataResponse[i].Date)
          .set({
            hour: dataResponse[i].time.split(":")[0],
            minute: dataResponse[i].time.split(":")[1],
          })
          .toDate(),
        end: moment(dataResponse[i].Date)
          .set({
            hour: dataResponse[i].time.split(":")[0],
            minute: dataResponse[i].time.split(":")[1],
          })
          .toDate(),
      };
      obj.push(newdata);
    }
    setAlldata(obj);
    console.log(obj);
  };
  useEffect(() => {
    fetchAlldata()
  }, []);
  const handleEdit = (e) => {
    e.preventDefault();
    navigates(`/edit/${getid}`);
  };
  const handlebook = (e) => {
    e.preventDefault();
    navigates("/create");
  };
  const handleSelectSlot = () => {
    navigates("/create");
  };

  return (
    <>
      <div className="main">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="close-btn">
            <button onClick={closeModal}>
              <IoClose />
            </button>
          </div>
          <form className="form-btn">
            <button className="btn1" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn2" onClick={handledelete}>
              Delete
            </button>
          </form>
        </Modal>
      </div>
      <div className="booking-interview">
        <button onClick={handlebook}>Booking Interview</button>
      </div>
      <div
        className={modalIsOpen ? "calender-containers" : "calender-container"}
      >
        <Calendar
          localizer={localizer}
          events={alldata}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "85vh" }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
        />
      </div>
    </>
  );
};

export default Dashboard;
