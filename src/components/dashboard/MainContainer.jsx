import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Chip } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import { green, pink } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const navigator=useNavigate()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const bigScreenView = useMediaQuery('(min-width:600px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
 
      <List>
        {['Test Series', 'Live Tests', 'Previous Years', 'Practice'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
      color='transparent'
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
         
          </Typography>
        </Toolbar>
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      





      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar/>
       <p className='font-medium text-2xl text-gray-600'>Your Recent Test Series</p>

        <div className={`pt-8 flex gap-8 ${bigScreenView ? "w-full":"w-[370px]"}  overflow-scroll`}>
            <div className=' shrink-0 w-60 border border-gray-300 h-48 rounded-md shadow-md p-4 bg-gradient-to-r from-slate-50 to-sky-100 '>
                <div className='flex justify-between items-center'>
                    <Avatar sx={{ bgcolor: green[500] }}>
                    <FaceIcon />
                    </Avatar>
                    <Chip icon={<FaceIcon />} label="600 Students" variant="outlined" />
                </div>
                <div className='pt-4'>
                <p>SSC English Previous Year Paper</p>
                </div>
                <div className='py-4'>
                    <div className="p-1 rounded-sm bg-sky-700  text-center px-2 cursor-pointer text-white" onClick={()=>navigator("/test")}>
                    Go To Test Series
                    </div>
                </div>
            </div>
            <div className='shrink-0 w-60 border border-gray-300 h-48 rounded-md shadow-md p-4 bg-gradient-to-r from-slate-50 to-sky-100 '>
                <div className='flex justify-between items-center'>
                    <Avatar sx={{ bgcolor: green[500] }}>
                    <FaceIcon />
                    </Avatar>
                    <Chip icon={<FaceIcon />} label="600 Students" variant="outlined" />
                </div>
                <div className='pt-4'>
                <p>SSC English Previous Year Paper</p>
                </div>
                <div className='py-4'>
                    <div className="p-1 rounded-sm bg-sky-700  text-center px-2 cursor-pointer text-white">
                    Go To Test Series
                    </div>
                </div>
            </div>
            <div className='shrink-0 w-60 border border-gray-300 h-48 rounded-md shadow-md p-4 bg-gradient-to-r from-slate-50 to-sky-100 '>
                <div className='flex justify-between items-center'>
                    <Avatar sx={{ bgcolor: green[500] }}>
                    <FaceIcon />
                    </Avatar>
                    <Chip icon={<FaceIcon />} label="600 Students" variant="outlined" />
                </div>
                <div className='pt-4'>
                <p>SSC English Previous Year Paper</p>
                </div>
                <div className='py-4'>
                    <div className="p-1 rounded-sm bg-sky-700  text-center px-2 cursor-pointer text-white">
                    Go To Test Series
                    </div>
                </div>
            </div>
        </div>
       
       
      </Box>




    </Box>
  );
}



export default ResponsiveDrawer;
