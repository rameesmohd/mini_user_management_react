import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import adminAxios from "../../../Axios/adminAxios.js";
// import './EditUser.css'

const EditUser = () => {
    const { id } = useParams();
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ErrMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const token = useSelector((state) => state.Admin.Token);

    useEffect(() => {
        adminAxios
            .get(`user_edit?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const data = res.data.result;
                setName(data.name);
                setPhone(data.phone);
                setEmail(data.email)
            });
    }, []);

    const handleEditUser = async (e) => {
        e.preventDefault();
        adminAxios
            .post(
                "/update_user",
                { name, phone,email ,id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                navigate("/admin/client_table");
            });
    };
  return (
    <div>
    <section className="sign-in">
        <div className="container_login" style={{ marginTop: "100px" }}>
            <div className="signIn-content">
                <div className="signIn-form">
                    <h2 className="form-title"></h2>
                    <form method="POST" className="register-form" onSubmit={handleEditUser} id="login-form">
                        <div className="form-group">
                            <label for="your_name">
                                <i className="zmdi zmdi-account material-icons-name"></i>
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                placeholder="Name"
                            />
                        </div>
                        <div className="form-group">
                            <label for="your_name">
                                <i className="zmdi zmdi-account material-icons-name"></i>
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                placeholder="email"
                            />
                        </div>
                        <div className="form-group">
                            <label for="your_number">
                                <i class="fa-sharp fa-solid fa-address-book"></i>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                id="pass"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                placeholder="Dial number"
                            />
                        </div>
                        <div className="form-group form-button">
                            <input type="submit" name="signIn" id="signIn" className="form-submit" value="Update" />
                        </div>
                        {ErrMsg.length > 0 && (
                            <div>
                                <p style={{ color: "red" }}>{ErrMsg}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    </section>
    </div>
)}

export default EditUser
