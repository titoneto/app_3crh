import React from 'react';
import { Modal } from '@mui/material';
import UserForm from './UserForm';
import { makeStyles } from '@mui/styles';
import api from '../../../api';

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    width: '600px',
    maxHeight: '80vh',
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '100px',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px'
  },
}));

const UserModal = ({ user, open, onClose }) => {
  const classes = useStyles();

  const saveUser = async (userData) => {
    try {
      const method = user ? 'put' : 'post';
      const url = user ? `users/${user.id}` : 'users';

      const response = await api({
        method: method,
        url: url,
        data: { user: userData },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      onClose();

      if (response.status >= 200 && response.status < 300) {
        alert(`User ${method === 'post' ? 'created' : 'updated'} successfully!`);
      } else {
        alert('Error saving user: ' + response.statusText);
      }
    } catch (error) {
      if (error.response) {
        alert('Error saving user: ' + JSON.stringify(error.response.data));
      } else {
        alert('Network error: ' + error.message);
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className={classes.modalContainer}>
        <UserForm user={user} onSave={saveUser} onClose={onClose} />
      </div>
    </Modal >
  );
};

export default UserModal;
