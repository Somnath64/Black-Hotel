import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loading from "../../../public/loading.svg";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProccessingPayment, setIsProccessingPayment] = useState(false);
  const navigate = useNavigate();

  console.log(payment>0);

  const handleConfirmBooking = () => {
    setIsProccessingPayment(true);
    setTimeout(() => {
      setIsProccessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 5000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <div className="card card-body mt-5">
      <h4>Reservation Summary</h4>
      <p>
        Name : <strong>{booking.guestName}</strong>
      </p>
      <p>
        Email : <strong>{booking.guestEmail}</strong>
      </p>
      <p>
        Check-In Date :{" "}
        <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
      </p>
      <p>
        Check-Out Date :{" "}
        <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
      </p>
      <p>
        Number of Days : <strong>{numberOfDays}</strong>
      </p>

      <div>
        <h5>Number of Guests</h5>
        <strong>
          Adult{booking.numberOfAdults > 1 ? "s" : ""} :{" "}
          {booking.numberOfAdults}
        </strong>
        <br />
        <strong>Children : {booking.numberOfChildren}</strong>
        {payment > 0 ? (
          <>
            <p>
              Total Payment : <strong>${payment}</strong>
            </p>
            {isFormValid && !isBookingConfirmed ? (
              <Button variant="success" onClick={handleConfirmBooking}>
                {isProccessingPayment ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm mr-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Booking Confirmed, redirecting to payment .....
                  </>
                ) : (
                  "Confirm Booking and proceed to payment"
                )}
              </Button>
            ) : isBookingConfirmed ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border">
                  <img src={Loading} alt="loading ...." />
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-danger">
            Check-out date must be after check-in date.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;
