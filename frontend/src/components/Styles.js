import { makeStyles } from '@material-ui/core/styles';

export const paramStyles = makeStyles((theme) => ({
    header: {
        marginTop: -5,
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        display: 'flex',
    },
    param: {
        marginTop: 10,
        padding: 30,
        textAlign: 'center',
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: 10
    },
    text1: {
        width: 200,
        height: 75,
        marginBottom: 20
    },
    text2: {
        width: 200,
        height: 75,
    },
    root: {
        marginRight: 20
    }
}))

export const formStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 315,
        marginRight: 315,
        marginTop: -55
    },
    upper: {
        height: 293,
        width: 1000,
        marginBottom: 80
    },
    lower: {
        height: 293,
        width: 1000
    },
    buttonFrame: {
        height: 50,
        width: 200,
        marginTop: 0,
        marginBottom: 30,
        marginLeft: 343,
    },
    button: {
        height: 50,
        width: 130,
        fontSize: 17,
        background: theme.palette.info.main
    },
    progress: {
        float: 'right'
    }
}));

