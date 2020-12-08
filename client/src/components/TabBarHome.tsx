import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import FavFood from './FavFood';
import PersonalInfo from './PersonalInfo';
import AppContext from '../context/context';


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

  
function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
        {value === index && (
            <Box p={3}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));
  

const TabBarHome = () => {
    const classes = useStyles();
    const { tab, setTab } = useContext(AppContext);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };
    return(
        <div className={classes.root}>
            <AppBar position="static">
            <Tabs value={tab} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="פרטים אישיים" {...a11yProps(0)} />
                <Tab label="מאכלים אהובים" {...a11yProps(1)} />
            </Tabs>
            </AppBar>
            <TabPanel value={tab} index={0}>
                <PersonalInfo/>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <FavFood/>
            </TabPanel>
        </div>
    )
}

export default TabBarHome;
