import React from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import validateCPF from '../../../utils/cpfValidator';

const useStyles = makeStyles((theme) => ({
  overflowContainer: {
    padding: '10px 0px',
    overflowY: 'auto',
    maxHeight: '700px'
  },

  footer: {
    marginTop: '16px'
  },
}));

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  cpf: Yup.string().matches(/^\d{11}$/, 'CPF deve ter 11 dígitos').required('CPF é obrigatório').test('is-valid-cpf', 'CPF inválido', value => validateCPF(value)),
  birthdate: Yup.date().required('Data de nascimento é obrigatória'),
  addresses: Yup.array().of(
    Yup.object().shape({
      street: Yup.string().required('Rua é obrigatória'),
      city: Yup.string().required('Cidade é obrigatória'),
      state: Yup.string().required('Estado é obrigatório'),
      zip_code: Yup.string().required('CEP é obrigatório')
    })
  )
});

const UserForm = ({ onSave, user, onClose }) => {
  const classes = useStyles();

  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    cpf: user?.cpf || '',
    birthdate: user?.birthdate || '',
    addresses: user?.addresses || []
  };

  return (
    <Container maxWidth="sm" className={classes.overflowContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const userData = { ...values, addresses_attributes: values.addresses };
          onSave(userData);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Typography variant="h4" gutterBottom>
              {user ? "Editar Usuário" : "Cadastrar Usuário"}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="cpf"
                  label="CPF"
                  variant="outlined"
                  fullWidth
                  type="number"
                  error={touched.cpf && Boolean(errors.cpf)}
                  helperText={touched.cpf && errors.cpf}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="birthdate"
                  label="Birth Date"
                  variant="outlined"
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={touched.birthdate && Boolean(errors.birthdate)}
                  helperText={touched.birthdate && errors.birthdate}
                />
              </Grid>

              <FieldArray name="addresses">
                {({ push }) => (
                  <>
                    {values.addresses.map((_, index) => (
                      <React.Fragment key={index}>

                        <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '16px', marginBottom: '-8px', marginTop: '16px' }}>
                          {`Endereço ${index}:`}
                        </Typography>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name={`addresses.${index}.street`}
                            label="Street"
                            variant="outlined"
                            fullWidth
                            error={touched.addresses?.[index]?.street && Boolean(errors.addresses?.[index]?.street)}
                            helperText={touched.addresses?.[index]?.street && errors.addresses?.[index]?.street}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name={`addresses.${index}.city`}
                            label="City"
                            variant="outlined"
                            fullWidth
                            error={touched.addresses?.[index]?.city && Boolean(errors.addresses?.[index]?.city)}
                            helperText={touched.addresses?.[index]?.city && errors.addresses?.[index]?.city}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name={`addresses.${index}.state`}
                            label="State"
                            variant="outlined"
                            fullWidth
                            error={touched.addresses?.[index]?.state && Boolean(errors.addresses?.[index]?.state)}
                            helperText={touched.addresses?.[index]?.state && errors.addresses?.[index]?.state}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name={`addresses.${index}.zip_code`}
                            label="Zip Code"
                            variant="outlined"
                            fullWidth
                            type="number"
                            error={touched.addresses?.[index]?.zip_code && Boolean(errors.addresses?.[index]?.zip_code)}
                            helperText={touched.addresses?.[index]?.zip_code && errors.addresses?.[index]?.zip_code}
                          />
                        </Grid>

                      </React.Fragment>
                    ))}
                    <Button onClick={() => push({ street: '', city: '', state: '', zip_code: '' })} style={{ marginLeft: '8px' }}>
                      Adicionar Endereço
                    </Button>
                  </>
                )}
              </FieldArray>

              <Grid item xs={12} className={classes.footer}>
                <Button type="submit" variant="contained" color="primary" >
                  Salvar
                </Button>

                <Button variant="contained" color="primary" style={{ marginLeft: '4px' }} onClick={onClose}>
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default UserForm;
