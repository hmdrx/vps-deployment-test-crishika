import { useState } from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';
import StartQuiz from './Quiz/StartQuiz';
import Performance from './Performance/Performance';
import AccountDetails from './Account/AccountDetails';
import DashboardBg from '../../components/DashboardBg';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <DashboardBg>
      <Stack sx={{ minHeight: '100vh', py: { md: 4 } }} alignItems="center">

        <Box
          sx={{
            flex: 1,
            width: '100%',
            maxWidth: '100rem',
            borderRadius: 5,
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(2.2rem)',
            p: { xs: 1, md: 0 },
          }}
        >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="basic tabs example"
              >
                <Tab label="Performance" {...a11yProps(0)} />
                <Tab label="Test" {...a11yProps(1)} />
                <Tab label="Account" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} >
                <Performance />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <StartQuiz />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <AccountDetails />
              </TabPanel>
            </SwipeableViews>
        </Box>

      </Stack>
    </DashboardBg>
  );
};

export default Dashboard;
