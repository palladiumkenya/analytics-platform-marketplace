'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard(props: any) {
    const {pluginName, description, pluginId, version} = props;
    
    const installPlugin =  async () => {
      // Fetch url
      const response = await fetch(`${process.env.NEXT_PUBLIC_MARKETPLACE_API}/configs/${pluginId}`, { cache: 'no-store' });
      const responseBody = await response.json();
      const pluginUrl = responseBody.data.url;
      const link = document.createElement('a');
      link.href = pluginUrl;
      link.download = ''; // let browser use the filename from the server
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);      
    
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
          {`${pluginName} version(${version})`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={installPlugin} size="small">Download</Button>
      </CardActions>
    </Card>
  );
}
