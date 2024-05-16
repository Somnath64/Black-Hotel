import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-5">
      <h2>Welcome to admin panel</h2>
      <hr />
      <Link to={"/addroom"}>Manage Rooms</Link>
    </section>
  );
};

export default Admin;