import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2'
import adminAxios from "../../../Axios/adminAxios.js";


const Client = () => {

    const navigate = useNavigate();
    const token = useSelector((store) => store.Admin.Token);
    console.log(2345);
    console.log(token);
    const [userData, setUserData] = useState([]);
    const [SearchInput, setSearchInput] = useState("");

    useEffect(() => {
        adminAxios
            .get("/getUsers", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setUserData(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    const DeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                adminAxios
                .post(
                    "/delete_user",
                    { id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    setUserData(response.data.result);
                })
                .catch((error) => {
                    Toast.fire(error.message);
                    console.log(error);
                });
            }
        });
    };

  return (
    <div className="">
    <div className="m-5">
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <form className="d-flex flex-fill" role="search">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        value={ SearchInput}
                        onChange={(e)=>setSearchInput(e.target.value)}
                        aria-label="Search"
                    />
                    <button className="btn btn-dark" type="submit">
                        Search
                    </button>
                </form>
            </div>
        </nav>
    </div>
    <table className="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            {userData.filter((user=> user.email.toLowerCase().includes(SearchInput))).map((obj, index) => {
                return (
                    <tr key={obj._id}>
                        <th key={obj._id} scope="row">
                            {index + 1}
                        </th>
                        <td key={obj._id}>{obj.name}</td>
                        <td key={obj._id}>{obj.email}</td>
                        <td key={obj._id}>{obj.phone}</td>
                        <td key={obj._id}>
                            <button
                                onClick={() => navigate(`/admin/user_edit/${obj._id}`)}
                                className="btn btn-dark btn-sm">
                                Edit
                            </button>
                        </td>
                        <td key={obj.id}>
                            <button onClick={() => DeleteUser(obj._id)} className="btn btn-danger btn-sm">
                                Delete
                            </button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
</div>
  )
}

export default Client