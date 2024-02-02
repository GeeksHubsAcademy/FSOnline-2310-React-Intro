import "./Admin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bringAllUsers } from "../../services/apiCalls";
import { A } from "../../components/Accordion/Accordion.jsx";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import { viewUserDetail } from "../userDetailSlice.js";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const dispatch = useDispatch()
  const userRdxData = useSelector(userData)

  const token = userRdxData.credentials.token
  const decoded = userRdxData.credentials.userData

  const navigate = useNavigate();

  const deleteUserButtonHandler = (e) => {
    dispatch(viewUserDetail(e.target.id))
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
                  handler={deleteUserButtonHandler}
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