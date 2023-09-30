import { useState } from 'react';
import PropTypes from 'prop-types';

function EditContact({contact, onSave}) {
  const [editedContact, setEditedContact] = useState(contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await fetch('https://conlisweb.000webhostapp.com/edit.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedContact),
      });

      const data = await response.json();

      if (data.status === 200) {
    
        onSave(data.data);
      } else {
        console.error('Error editing contact');
      }
    } catch (error) {
      console.error('Error editing contact:', error);
    }
  };

  return (
    <div>
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="lname"
          value={editedContact.lname}
          onChange={handleChange}
          placeholder="Last name"
          required
        />
        <input
          type="text"
          name="fname"
          value={editedContact.fname}
          onChange={handleChange}
          placeholder="First name"
          required
        />
        <input
          type="email"
          name="emailAdd"
          value={editedContact.emailAdd}
          onChange={handleChange}
          placeholder="Email address"
          required
        />
        <input
          type="tel"
          name="contactNum"
          value={editedContact.contactNum}
          onChange={handleChange}
          placeholder="Contact number"
          required
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditContact;

EditContact.propTypes = {
    onSave: PropTypes.func.isRequired, 
    contact: PropTypes.object.isRequired, 
  };
  
