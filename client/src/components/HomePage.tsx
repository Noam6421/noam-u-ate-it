import { makeStyles } from '@material-ui/core/styles';

import TabBarHome from './TabBarHome';
import AppBarHome from './AppBarHome';

const useStyles = makeStyles((theme) => ({
    logo: {
        maxWidth: 80,
    },
    root: {
      flexGrow: 1,
    },
}));

const HomePage = () => {
    
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <AppBarHome/>
            <TabBarHome/>
        </div>
    )
}

export default HomePage;
