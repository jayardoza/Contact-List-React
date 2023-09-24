import PropTypes from 'prop-types';
import { useState } from 'react';

function AddContact({ onAdd }) {
  const [newContact, setNewContact] = useState({
    lname: '',
    fname: '',
    emailAdd: '',
    contactNum: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://doited-error.000webhostapp.com/add.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      const data = await response.json();

      if (data.status === 200) {
        onAdd(data.data);

        setNewContact({
          lname: '',
          fname: '',
          emailAdd: '',
          contactNum: '',
        });
      } else {
        console.error('Error adding contact');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div>
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={newContact.lname}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={newContact.fname}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailAdd">Email Address:</label>
          <input
            type="email"
            id="emailAdd"
            name="emailAdd"
            value={newContact.emailAdd}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNum">Contact Number:</label>
          <input
            type="tel"
            id="contactNum"
            name="contactNum"
            value={newContact.contactNum}
            onChange={handleChange}
            placeholder="Contact Number"
            required
          />
        </div>
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}

export default AddContact;

AddContact.propTypes = {
    onAdd: PropTypes.func.isRequired,
  };
  