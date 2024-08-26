import React, { useState, useEffect } from 'react';
import UserModal from './components/UserModal';
import FilterModal from './components/FilterModal';
import api from '../../api';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Button, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '20px 40px',
    backgroundColor: '#f9f9f9'
  }
}));

const UserPage = () => {
  const classes = useStyles();

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);


  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  const handleDelete = async (user) => {
    try {
      await api.delete(`/users/${user.id}`, user);
      setUsers(users.filter(userItem => userItem.id != user.id ));

    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleNewUserButton = () => {
    setSelectedUser(null);
    setUserModalOpen(true);
  };

  const handlerFilterButton = () => {
    setFilterModalOpen(true);
  };

  const handleSubmitFilter = async (filterFields) => {
    try {
      const queryParams = new URLSearchParams(filterFields).toString();
      const response = await api.get(`/users?${queryParams}`);
      setUsers(response.data);
      setFilterModalOpen(false);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [userModalOpen]);

  return (
    <div className={classes.container}>
      <div >
        <h1>Lista de Usuários</h1>

        <Button onClick={handlerFilterButton} variant="contained">
          Filtro
        </Button>

        <Button onClick={handleNewUserButton} variant="contained" style={{ marginLeft: '5px' }}>
          Adicionar Novos Usuários
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Data de Nascimento</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user) => (
              <TableRow key={user.id} onClick={() => handleUserClick(user)}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.cpf}</TableCell>
                <TableCell>{user.birthdate}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(user) }>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(user) }>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UserModal open={userModalOpen} user={selectedUser} onClose={() => setUserModalOpen(false)} />
      <FilterModal open={filterModalOpen} onClose={() => setFilterModalOpen(false)} onSubmit={handleSubmitFilter} />

    </div>
  );
};

export default UserPage;
