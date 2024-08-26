import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: '16px'
  },
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


const FilterModal = ({ onSubmit, onClose, open }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filterData = { name, email, cpf, birthdate };
    await onSubmit(filterData);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className={classes.modalContainer}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Filtro de Usuários
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="CPF"
                variant="outlined"
                fullWidth
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Birth Date"
                variant="outlined"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </Grid>
          </Grid>

          <div className={classes.footer}>
            <Button type="submit" variant="contained" color="primary">
              Buscar
            </Button>

            <Button variant="contained" color="primary" style={{ marginLeft: '4px' }} onClick={onClose}>
              Cancelar
            </Button>
          </div>

        </form>
      </div>
    </Modal>
  );
};

export default FilterModal;
