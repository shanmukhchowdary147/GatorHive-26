import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import { BiEditAlt } from "react-icons/bi";
import Axios from "axios";

function EditProfile() {
  const [flag, setFlag] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("USA");
  const [state, setState] = useState("Florida");
  const [editableField, setEditableField] = useState("");

  const handleFieldEdit = (fieldName) => {
    setEditableField(editableField == fieldName ? "" : fieldName);
  };

  const updateProfile = (e) => {
    e.preventDefault();
    if (!flag) {
      return alert("No changes made");
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:3000/users", {
      // params: {
      // },
    })
      .then((res) => {
        console.log(res);
        // setFirstName(res.data.firstName);
        // setLastName(res.data.lastName);
        // setEmail(res.data.email);
        // setPhone(res.data.phone);
        // setPassword(res.data.password);
        // setAddress1(res.data.address1);
        // setAddress2(res.data.address2);
        // setCity(res.data.city);
        // setZipCode(res.data.zipCode);
        // setCountry(res.data.country);
        // setState(res.data.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFieldChange = (event) => {
    switch (editableField) {
      case "firstName":
        setFlag(true);
        setFirstName(event.target.value);
        break;
      case "lastName":
        setFlag(true);
        setLastName(event.target.value);
        break;
      case "email":
        setFlag(true);
        setEmail(event.target.value);
        break;
      case "phone":
        setFlag(true);
        setPhone(event.target.value);
        break;
      case "password":
        setFlag(true);
        setPassword(event.target.value);
        break;
      case "address1":
        setFlag(true);
        setAddress1(event.target.value);
        break;
      case "address2":
        setFlag(true);
        setAddress2(event.target.value);
        break;
      case "city":
        setFlag(true);
        setCity(event.target.value);
        break;
      case "zipCode":
        setFlag(true);
        setZipCode(event.target.value);
        break;
      case "country":
        setFlag(true);
        setCountry(event.target.value);
        break;
      case "state":
        setFlag(true);
        setState(event.target.value);
        break;
      default:
        break;
    }
    event.preventDefault();
  };

  const renderEditableField = (fieldName, fieldValue) => {
    if (editableField === fieldName) {
      return (
        <input type="text" value={fieldValue} onChange={handleFieldChange} />
      );
    } else {
      return <span>{fieldValue}</span>;
    }
  };

  return (
    <div className="edit-profile">
      <h1>Edit Profile</h1>
      <div>
        <label>First Name:</label>
        <a>{renderEditableField("firstName", firstName)} </a>
        <BiEditAlt onClick={() => handleFieldEdit("firstName")} />
      </div>
      <div>
        <label>Last Name:</label>
        {renderEditableField("lastName", lastName)}
        <BiEditAlt onClick={() => handleFieldEdit("lastName")} />
      </div>
      <div>
        <label>Email:</label>
        {renderEditableField("email", email)}
        <BiEditAlt onClick={() => handleFieldEdit("email")} />
      </div>
      <div>
        <label>Phone:</label>
        {renderEditableField("phone", phone)}
        <BiEditAlt onClick={() => handleFieldEdit("phone")} />
      </div>
      <div>
        <label>Password:</label>
        {renderEditableField("password", password)}
        <BiEditAlt onClick={() => handleFieldEdit("password")} />
      </div>
      <div>
        <label>Address 1:</label>
        {renderEditableField("address1", address1)}
        <BiEditAlt onClick={() => handleFieldEdit("address1")} />
      </div>
      <div>
        <label>Address 2:</label>
        {renderEditableField("address2", address2)}
        <BiEditAlt onClick={() => handleFieldEdit("address2")} />
      </div>
      <div>
        <label>City:</label>
        {renderEditableField("city", city)}
        <BiEditAlt onClick={() => handleFieldEdit("city")} />
      </div>
      <div>
        <label>Zip Code:</label>
        {renderEditableField("zipCode", zipCode)}
        <BiEditAlt onClick={() => handleFieldEdit("zipCode")} />
      </div>
      <div>
        <label>State:</label>
        {renderEditableField("state", state)}
        <BiEditAlt className="inv" onClick={() => handleFieldEdit("state")} />
      </div>
      <div>
        <label>Country:</label>
        {renderEditableField("country", country)}
        <BiEditAlt className="inv" onClick={() => handleFieldEdit("country")} />
      </div>
      <button onClick={updateProfile} className="save">
        Save
      </button>
    </div>
  );
}

export default EditProfile;
