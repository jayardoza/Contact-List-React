import PropTypes from 'prop-types';

function DeleteContact({contactId, onDelete}) {
  const handleDelete = async () => {
    
    try {
      const response = await fetch(`https://doited-error.000webhostapp.com/delete.php?id=${contactId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.status === 200) {
       
        onDelete(contactId);
      } else {
        console.error('Error deleting contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete this contact?</p>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={() => onDelete(null)}>No</button>
    </div>
  );
}

export default DeleteContact;
DeleteContact.propTypes = {
    contactId: PropTypes.number.isRequired, 
    onDelete: PropTypes.func.isRequired,
  };
  