import { useState } from 'react';
import ContactList from './components/ContactList'; 
import AddContact from './components/AddContact'; 
import EditContact from './components/EditContact'; 
import DeleteContact from './components/DeleteContact'; 
import './styles.css';

function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="App">

      <ContactList
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />

      {showAddModal && <AddContact />}
      {showEditModal && <EditContact />}
      {showDeleteModal && <DeleteContact />}
    </div>
  );
}

export default App;
