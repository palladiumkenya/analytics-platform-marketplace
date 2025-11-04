'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function MediaCard(props: any) {
    const {pluginName, description, pluginId, installed} = props;
    
    const installPlugin =  async () => {
      const response = await fetch(`http://localhost:5000/plugin/install/${pluginId}`, {
        method: 'POST',
    });
    if(response.ok) {
        console.log('Successfully installed plugin');
    }
    }
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/plugin.png"
        title="plugin"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pluginName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
      </CardContent>
      <CardActions>
        {!installed && <Button onClick={installPlugin} size="small">Download</Button>}
        {installed && <IconButton aria-label="Installed" disabled color="info" size="small"><CheckCircleIcon color='info'/></IconButton>}
      </CardActions>
    </Card>
  );
}
