import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
} from '@mui/material';
import { useGetSitesQuery } from '../../slices/sites/sitesApiSlice';

const top100Films = [{ label: 'The Shawshank Redemption', year: 1994 }];

export default function TransportationTaskForm({
  handleInputChange,
  formData,
  setFormData,
}) {
  const { data, isLoading } = useGetSitesQuery('sitesList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { entities = {} } = data || {};

  const sites = Object.values(entities).map((entry) => {
    return { id: entry.id, label: entry.name };
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Transport details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            onChange={handleInputChange}
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            variant="standard"
            value={formData.description}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
            <Input
              onChange={handleInputChange}
              value={formData.weight}
              required
              type="number"
              id="weight"
              name="weight"
              fullWidth
              endAdornment={<InputAdornment position="end">ton</InputAdornment>}
            />
            <FormHelperText id="weight">Weight *</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
            <Input
              onChange={handleInputChange}
              value={formData.pricePerTon}
              required
              type="number"
              id="pricePerTon"
              name="pricePerTon"
              fullWidth
              endAdornment={<InputAdornment position="end">Br.</InputAdornment>}
            />
            <FormHelperText id="pricePerTon">Price Per Ton *</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="source"
            options={sites}
            onChange={(event, newValue) => {
              setFormData({ ...formData, source: newValue?.id ?? '' });
            }}
            renderInput={(params) => (
              <TextField
                name="source"
                value={formData.source}
                {...params}
                label="Source"
                variant="standard"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            value={formData.destination}
            required
            id="destination"
            name="destination"
            label="Destination"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            value={formData.assignedVehicle}
            required
            id="assignedVehicle"
            name="assignedVehicle"
            label="Assigned Vehicle"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            value={formData.assignedDriver}
            required
            id="assignedDriver"
            name="assignedDriver"
            label="Assigned Driver"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleInputChange}
            value={formData.scheduledTime}
            required
            id="scheduledTime"
            name="scheduledTime"
            label="Scheduled Time"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
