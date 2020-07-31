import React, { useState } from 'react'
import { makeStyles, Container, Grid, Paper, Typography } from '@material-ui/core';
import Rent from './rent';
import Space from './space';
import { ChainContext } from '../_app';
import { IChainContext, IUser } from '../../src/types';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        display:'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '23vh',
        width: '12vw',
        minWidth: '10rem',
        cursor: 'pointer',
    },
    control: {
        padding: theme.spacing(2),
    },
}))

export default function Home() {
    const classes = useStyles()
    const [view, setView] = useState<string | undefined>();

    const openView = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, newView: string) => {
        setView(newView);
        event.preventDefault();
    }

    const choices = (user: IUser) => {
        return [
            {
                title: (user.space !== undefined ? 'View your' : 'Buy') + ' SPACE',
                picture: 'images/navigate-icons/category.svg',
                view: 'space',
            },
            {
                title: 'Rent SPACE',
                picture: 'images/navigate-icons/others.svg',
                view: 'rent',
            },
        ];
    }

    const navigateOptions = (chainContext: IChainContext) => {
        if (view === 'space') {
            return <Space />;
        } else if (view === 'rent') {
            return <Rent />;
        } else {
            return <Container maxWidth="sm">
                {/* TODO: align vertically */}
                <Grid container justify="center" spacing={5} style={{ marginTop: '40%', justifyContent: 'center', alignItems: 'center', }}>
                    {choices(chainContext.user).map((choice) => (
                        <Grid key={choice.title} item xs={12} md={6}>
                            <Paper className={classes.paper} onClick={(e) => openView(e, choice.view)}>
                                <img height="95" src={choice.picture} style={{margin:"2rem"}}/>
                                <Typography variant="body1" component="p" gutterBottom>
                                    {choice.title}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>;
        }
    }

    return (
        <ChainContext.Consumer>
            {(chainContext) => navigateOptions(chainContext)}
        </ChainContext.Consumer>
    );
}