import React, { useState } from "react";
import "./EditProfile.css";
import { BiEditAlt } from "react-icons/bi";

function EditProfile() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("555-555-5555");
  const [password, setPassword] = useState("password");
  const [address1, setAddress1] = useState("123 Main St.");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("Gainesville");
  const [zipCode, setZipCode] = useState("12345");
  const [country, setCountry] = useState("USA");
  const [state, setState] = useState("Florida");
  const [editableField, setEditableField] = useState("");

  const handleFieldEdit = (fieldName) => {
    setEditableField(editableField == fieldName ? "" : fieldName);
  };

  const handleFieldChange = (event) => {
    switch (editableField) {
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "phone":
        setPhone(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "address1":
        setAddress1(event.target.value);
        break;
      case "address2":
        setAddress2(event.target.value);
        break;
      case "city":
        setCity(event.target.value);
        break;
      case "zipCode":
        setZipCode(event.target.value);
        break;
      case "country":
        setCountry(event.target.value);
        break;
      case "state":
        setState(event.target.value);
        break;
      default:
        break;
    }
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
        <BiEditAlt className = "inv" onClick={() => handleFieldEdit("state")} />
      </div>
      <div>
        <label>Country:</label>
        {renderEditableField("country", country)}
        <BiEditAlt className = "inv" onClick={() => handleFieldEdit("country")} />
      </div>
      <button className="save">Save</button>
    </div>
  );
}

export default EditProfile;
