import { useState, useEffect } from 'react';
import axios from 'axios';
const UserMySql = () => {
    const [user, setUser] = useState([]);
    const getUsers = () => {
        axios
            .get('/usermysql')
            .then((res) => {
                setUser(res.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getUsers();
    }, []);
    const createTodo = (event) => {
        event.preventDefault();
        let userObject = {
            email: event.target.email.value,
            password: event.target.password.value,
            userinfo: event.target.userinfo.value,
            dob: event.target.dob.value,
        };
        axios
            .post('/usermysql', userObject)
            .then((res) => {
                getUsers();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteTodo = (email) => {
        axios
            .delete('/usermysql/' + email)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getUsers();
    };
    const deleteAll = () => {
        axios
            .get('/usermysql/deleteall')
            .then((res) => {
                console.log(res.data);
                getUsers();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="container-fluid text-center">
            <h1 className="mt-3">User Registration</h1>
            <form className="form-group" onSubmit={createTodo}>
                <b>Email : </b>
                <input
                    className="form-control d-inline-flex w-50"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                />
                <br />
                <b>Password : </b>
                <input
                    className="form-control d-inline-flex w-50"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                />
                <br />
                <b>User Info : </b>
                <input
                    className="form-control d-inline-flex w-50"
                    type="text"
                    name="userinfo"
                    placeholder="Enter User Info"
                />
                <br />
                <b>Date of Birth : </b>
                <input
                    className="form-control d-inline-flex w-50"
                    type="date"
                    name="dob"
                    placeholder="Enter Date of Birth"
                />
                <br />
                <button className="btn btn-outline-primary">
                    <b>Add User</b>
                </button>
                <br />
            </form>
            <button className="btn btn-outline-danger" onClick={deleteAll}>
                <b>Delete All</b>
            </button>
            <br />
            <div className="table table-bordered table-striped text-center">
                <table className="text-center">
                    <tr>
                        <th>S.No</th>
                        <th>Email Id</th>
                        <th>Password</th>
                        <th>User Info</th>
                        <th>Date of Birth</th>
                        <th>Button</th>
                    </tr>
                    {user.map((val, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{val.email}</td>
                                <td>{val.password}</td>
                                <td>{val.userinfo}</td>
                                <td>{val.dob}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => {
                                            deleteTodo(val.email);
                                        }}
                                    >
                                        <b> Delete</b>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
};
export default UserMySql;
