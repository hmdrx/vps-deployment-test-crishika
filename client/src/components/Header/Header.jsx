import { useState } from 'react';
import { Box, Button, Container, Divider, Stack } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import logo from '../../assets/images/logo-512.png';

// Mobile Drawer imports
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// icons
import MenuIcon from '@mui/icons-material/Menu';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { useSelector } from 'react-redux';

const tabsNameAndLink = [
  { tabName: 'Pricing', link: 'pricing' },
  { tabName: 'About Us', link: 'about_us' },
  { tabName: 'Contact', link: 'contact' },
];

const Header = () => {
  const [state, setState] = useState(false);

  const auth = useSelector(state=>state.auth.token);

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ bgcolor: '#25bf7770', display: { xs: 'none', sm: 'block' } }}>
        <Container>
          <Stack
            sx={{ py: 2 }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center">
              <Link to="/">
                <Box
                  sx={{ maxWidth: '5rem' }}
                  component="img"
                  src={logo}
                  alt="logo"
                />
              </Link>
              {tabsNameAndLink.map(el => {
                return (
                  <NavLink
                    to={el.link}
                    key={el.link + Math.random()}
                    className={({ isActive }) =>
                      isActive ? classes['navlink-active'] : classes.navlink
                    }
                  >
                    {el.tabName}
                  </NavLink>
                );
              })}
            </Stack>
            {auth ? <Link to="/dashboard">
              <Button variant="outlined">Dashboard</Button>
            </Link> :<Link to="/login">
              <Button variant="outlined">Login</Button>
            </Link>}
            
          </Stack>
        </Container>
      </Box>
      {/* Mobile Drawer */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          p: 1,
          display: { xs: 'block', sm: 'none' },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <MenuIcon
            fontSize="large"
            color="secondary"
            onClick={toggleDrawer(true)}
          />
          <Link to="/login">
            <Button variant="outlined" size="small" color="secondary">
              Login
            </Button>
          </Link>
        </Stack>
      </Box>
      <Drawer
        PaperProps={{
          sx: { bgcolor: '#25bf7770', backdropFilter: 'blur(1rem)' },
        }}
        anchor="left"
        open={state}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ width: 250 }}>

           <List>
          <Link to={'/'} onClick={toggleDrawer(false)}>
                <ListItem disablePadding >
                  <ListItemButton disableRipple >
                    <ListItemIcon> <Box
                sx={{ width: 34 }}
                component="img"
                src={logo}
                alt="logo"
              /></ListItemIcon>
                    <ListItemText sx={{ color: 'white', textTransform: 'uppercase', letterSpacing: '.2rem' }} primary={'crishika.com'} />
                  </ListItemButton>
                </ListItem>
              </Link>
          </List> 
          <Divider/>
         

          {/* <Link to="/" onClick={toggleDrawer(false)}>
              <Box
                sx={{ maxWidth: '5rem' }}
                component="img"
                src={logo}
                alt="logo"
              />
              <Typography sx={{textAlign: 'center', textTransform: 'uppercase', letterSpacing: '.2rem', border: 1, p:1, m:1, color: 'white'}} variant='h6' component='span' >Crishika.com</Typography>
            </Link> */}

          <List>
            {[
              {
                menu: 'Pricing',
                icon: <LocalOfferOutlinedIcon sx={{color: 'white'}} />,
                goTo: '/pricing',
              },
              {
                menu: 'About Us',
                icon: <InfoOutlinedIcon sx={{color: 'white'}} />,
                goTo: '/about_us',
              },
              {
                menu: 'Contact',
                icon: <SupportAgentOutlinedIcon sx={{color: 'white'}} />,
                goTo: '/contact',
              },
            ].map(({ menu, icon, goTo }, index) => (
              <Link key={index} to={goTo} onClick={toggleDrawer(false)}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText sx={{ color: 'white' }} primary={menu} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
