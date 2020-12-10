import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    logo: {
        maxWidth: 80,
    },
    root: {
      flexGrow: 1,
    },
    formField: {
        direction: 'rtl',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 225,
    },
    menuItem: {
        direction: 'rtl',
        width: 225,
    },
    legend:{
        textAlign: 'left'
    }
}));

export default useStyles;