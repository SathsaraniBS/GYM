import React from 'react';
import { Box, Grid } from '@mui/material';

const WorkoutImages = () => {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'black', minHeight: '100vh', p: 3, color: 'white' }}>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <img 
            src="gallery1.jpg" 
            alt="Person doing bicep curls" 
            className="object-cover w-full h-auto"
          />
        </Grid>
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <img 
            src="gallery2.jpg" 
            alt="Person doing deadlifts" 
            className="object-cover w-full h-auto"
          />
        </Grid>
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <img 
            src="gallery3.jpg" 
            alt="Person on elliptical machine" 
            className="object-cover w-full h-auto"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkoutImages;