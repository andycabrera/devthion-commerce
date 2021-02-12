import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { commerce } from '../../lib/commerce'
import {Link} from 'react-router-dom'

import FormInput from './CustomTextField'

const AddressForm = ({ checkoutToken, next }) => {
    const methods = useForm();

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ ... data }))}>
                    <Grid container spacing={3}>
                        <FormInput  required name='firstName' label='Nombre'/>
                        <FormInput  required name='lastName' label='Apellido'/>
                        <FormInput  name='address1' label='Direccion'/>
                        <FormInput  name='email' label='Email'/>
                        <FormInput  name='city' label='Ciudad'/>
                        <FormInput  name='zip' label='Codigo Postal'/>
                    </Grid>
                    <br/>
                    <br/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary"> Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm