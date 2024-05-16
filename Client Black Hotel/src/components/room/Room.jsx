import { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import RoomCard from "./RoomCard";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import Loading from "../../../public/loading.svg";

const Room = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomPerPage] = useState(6);
  const [filteredData, setFilteredData] = useState([{ id: "" }]);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <img src={Loading} alt="" />
      </div>
    );
  }

  if (error) {
    return <div className="text-danger">Error:{error}</div>;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / roomPerPage);
  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomPerPage;
    const endIndex = startIndex + roomPerPage;
    return filteredData
      .slice(startIndex, endIndex)
      .map((room) => <RoomCard key={room.id} room={room} />);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <RoomFilter data={data} setFilteredData={setFilteredData} />
          </Col>
        </Row>
        <Row>{renderRooms()}</Row>
        <Row>
          <Col md={6} className="d-flex align-item-center justify-content-end">
            <RoomPaginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Room;
