import React, { useState, useEffect } from "react";
import axios from "axios";
import "./users.css";

const Users = () => {
  const [data, setData] = useState(null);


  useEffect(() => {
    makeGetRequest();
  }, []);

  const makeGetRequest = async () => {
    let res = await axios.get("http://localhost:3001/users");
    setData(res.data);
  };
  const renderData = (item, index) => {
      let sno = index + 1;
    return (
      
        <tr>
          <td className="column" >{sno}</td>
          <td className="column">{item.fName}</td>
          <td className="column">{item.lName}</td>
          <td className="column">{item.email}</td>
          <td className="column">{item.dob}</td>
          <td className="column" ><img src={item.imgUrl} alt={item.fName} /></td>
          </tr>
    );
  };

  return <>
    <table>
        <tr>
          <th className="column">Sno</th>
          <th className="column">First Name</th>
          <th className="column">Last Name</th>
          <th className="column">Email</th>
          <th className="column">D.O.B</th>
          <th className="column">Profile image</th>
        </tr>
        
            {data && data.map(renderData)}
        
      </table>    
            </>
};

export default Users;
