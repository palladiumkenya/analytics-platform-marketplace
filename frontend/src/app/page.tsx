// 'use client'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Unstable_Grid2';
import MediaCard from "./mediacard";
import BasicModal from "./submissionModal";
// import { useState, useEffect } from "react";

const drawerWidth = 240;

interface Plugin {
  id: number;
  pluginName: string;
  description: string;
  version: number;
}


export default async function Page() {
// const [plugins, setPlugins] = useState<Plugin[]>([]);

const res = await fetch('http://172.17.0.1:8888/api/v1/configs', { cache: 'no-store' });
const response = await res.json()
const data: Plugin[] = response.data;

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
    >
      <Toolbar />
      {/* <BasicModal stateChanger={fetchData} /> */}
      <BasicModal />
      <Grid container spacing={3}>
          {
            data.map(({ id, pluginName, description, version }) => (
              <Grid key={id} xs={4}>
                <MediaCard pluginName={pluginName} description={description} pluginId={id} version = {version} />
              </Grid>
            ))
          }
      </Grid>
    </Box>
  );
}
