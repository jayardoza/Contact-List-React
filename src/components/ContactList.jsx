import { useEffect, useState } from 'react';
import AddContact from './AddContact';
import EditContact from './EditContact';
import DeleteContact from './DeleteContact';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://doited-error.000webhostapp.com/read.php');
        const data = await response.json();

        if (data.status === 200) {
          setContacts(data.data);
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const openEditModal = (contact) => {
    setContactToEdit(contact);
    setShowEditModal(true);
  };

  const openDeleteModal = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  return (
    <div>
      <h1>Contact List</h1>
      <table border="1">

        <thead>
          <tr>
            <th>ID</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email Address</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
     
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.lastName}</td>
              <td>{contact.firstName}</td>
              <td>{contact.email}</td>
              <td>{contact.number}</td>
              <td>
                <button onClick={() => openEditModal(contact)}>Edit</button>
                <button onClick={() => openDeleteModal(contact)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      <button onClick={() => setShowAddModal(true)}>Add Contact</button>

     
      {showAddModal && <AddContact onAdd={() => setShowAddModal(false)} />}
      {showEditModal && contactToEdit && (
        <EditContact contact={contactToEdit} onSave={() => setShowEditModal(false)} />
      )}
      {showDeleteModal && contactToDelete && (
        <DeleteContact contact={contactToDelete} onDelete={() => setShowDeleteModal(false)} />
      )}
    </div>
  );
}

export default ContactList;
