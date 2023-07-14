import React, { useState } from "react";
import Layout from "../Layouts/Layout";
import AdminMenu from "../Layouts/AdminMenu";
//import { useAuth } from "../context/auth";

const Users = () => {
  
  const [users] = useState([])

//   const getUserdetails = async() =>{
//     try {
//         const { data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/users`)
//         setUsers(data.users)
//     } catch (error) {
        
//     }
//   }
  return (
    <Layout title={"Users | Bucket.co"}>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {
                users.map((a)=>{
                    return (
                        <>
                        <p>{a.name}</p>
                        <p>{a.email}</p>
                        </>
                    )
                })
            }
            {/* {JSON.stringify(auth , null, 4)} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
