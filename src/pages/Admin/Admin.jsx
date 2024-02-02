import "./Admin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bringAllUsers } from "../../services/apiCalls";
import { A } from "../../components/Accordion/Accordion.jsx";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const token = localStorage.getItem("token");
  const decoded = JSON.parse(localStorage.getItem("decodedToken"));

  const navigate = useNavigate();

  const deleteUserHandler = (e) => {
    console.log(e.target.id)
  }

  useEffect(() => {
    if (decoded.role !== "ADMIN") {
      navigate("/");
    } else {
      bringAllUsers().then((res) => {
        setUsers(res);
      });
    }
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="adminDesign">
      <div className="userList">
        {users.length > 0 ? (
          <>
            {users.map((user) => {
              return (
                <>
                  <A 
                  name={user.name} 
                  key={user._id}
                  email={user.email}
                  role={user.role}
                  id={user._id}
                  handler={deleteUserHandler}
                  >
                  </A>
                  
                </>
              );
            })}
          </>
        ) : null}
      </div>
    </div>
  );
};