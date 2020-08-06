import React, { useState, useContext } from 'react';
import { Button, Input, makeStyles, TextField, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Box, InputAdornment } from '@material-ui/core';
import { ChainContext } from '../../../pages/_app';
import { ethers, BigNumber } from 'ethers';
import { RentalAgentInstance } from '../../contracts/types/index';
import FFSStorage from '../../storage';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

export default function Rent() {
    const chainContext = useContext(ChainContext);
    const classes = useStyles();

    const [picture, setPicture] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [url, setUrl] = useState('');

    const [dealInProgress, setDealInProgress] = useState(false);
    const [errorRenting, setErrorRenting] = useState(false);
    const [successRenting, setSuccessRenting] = useState(false);
    const [finishedTx, setFinishedTx] = useState(false);

    const [titleFieldErr, setTitleFieldErr] = useState(true);
    const [descriptionFieldErr, setDescriptionFieldErr] = useState(true);
    const [categoryFieldErr, setCategoryFieldErr] = useState(true);
    const [urlFieldErr, setUrlFieldErr] = useState(true);
    const [imageErr, setImageErr] = useState(true);
    const [fieldErr, setFieldErr] = useState(false);
    const [cidExists, setCidExists] = useState(false);

    const handleSubmitNewRent = async () => {
        // TODO: verify fields
        if(titleFieldErr || descriptionFieldErr || categoryFieldErr || urlFieldErr || imageErr) {
            setFieldErr(true);
            return;
        }
        try {
            const storage = new FFSStorage();
            setDealInProgress(true);
            const cid = await storage.submitStorage(picture, title, description, category, url, () => { });
            // choose one SPACE without rent

            let notRented = [];
            for(let i = 0; i < chainContext.spaces.length; i++) {
                let s = chainContext.spaces[i];
                if(((await chainContext.rentalAgentInstance.spaceInfo(s.tokenId)) as any).rentedTo === '0x0000000000000000000000000000000000000000'){
                    notRented.push(s)
                }
            }
            
            // const notRented = chainContext.spaces.filter(async (s) => {
                    
            //         console.log("Space1: " + (await chainContext.rentalAgentInstance.spaceInfo(s.tokenId))[1])
            //         console.log(((await chainContext.rentalAgentInstance.spaceInfo(s.tokenId)) as any).rentedTo === '0x0000000000000000000000000000000000000000')
            //        return ((await chainContext.rentalAgentInstance.spaceInfo(s.tokenId)) as any).rentedTo === '0x0000000000000000000000000000000000000000'
            //     }
            // );
            console.log("Not rented: " + notRented)
            const totalSupply = BigNumber.from((await chainContext.decentramallTokenInstance.totalSupply()).toString());

            const rentPrice = BigNumber.from(
                (await chainContext.estateAgentInstance.price(totalSupply.add(1).toString())).toString()
            )
                .mul('10000000000000000')
                .div('10')
                .toString();
            const rentalAgentInstanceWithSigner = chainContext.rentalAgentInstance.connect(
                chainContext.user.signer
            ) as ethers.Contract & RentalAgentInstance;
            const signerAddress = await chainContext.user.signer.getAddress();
            await rentalAgentInstanceWithSigner
                .rent(notRented[0].tokenId, cid, { from: signerAddress, value: rentPrice });
            // wait just for tx to finish and update user UI with rent
            setDealInProgress(false)
            setFinishedTx(true);
            setSuccessRenting(true);
        } catch (e) {
            if(e.toString().includes("cid already pinned")){
                setCidExists(true);
            }
            setDealInProgress(false)
            setFinishedTx(true);
            setErrorRenting(true);
        } finally {

        }
    };

    const selectImage = (event: React.ChangeEvent<any>) => {
        setPicture(event.target.files[0]);
        setImageErr(false);
    };

    const handleChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        switch (event.target.name) {
            case 'title':
                setTitle(event.target.value);
                if(event.target.value === "") {
                    setTitleFieldErr(true);
                } else {
                    setTitleFieldErr(false);
                }
                break;
            case 'description':
                setDescription(event.target.value);
                if(event.target.value === "") {
                    setDescriptionFieldErr(true);
                } else {
                    setDescriptionFieldErr(false);
                }
                break;
            case 'category':
                setCategory(event.target.value);
                if(event.target.value === "") {
                    setCategoryFieldErr(true);
                } else {
                    setCategoryFieldErr(false);
                }
                break;
            case 'url':
                setUrl(event.target.value);
                if(event.target.value === "") {
                    setUrlFieldErr(true);
                } else {
                    setUrlFieldErr(false);
                }
                break;
        }
    };

    const renderContext = () => {
        // chack if user does not have rented space
        if (chainContext.user.rent === undefined) {
            return (
                <div style={{ marginLeft: '30%', padding: '20px' }}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            label="Title"
                            name="title"
                            value={title}
                            onChange={handleChangeInput}
                            style={{ width: '400px', marginBottom: '2rem'  }}
                            error={titleFieldErr}
                            variant="outlined"
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={description}
                            onChange={handleChangeInput}
                            multiline
                            style={{ width: '400px', marginBottom: '2rem'  }}
                            error={descriptionFieldErr}
                            variant="outlined"
                        />
                        <TextField
                            label="Category"
                            name="category"
                            value={category}
                            onChange={handleChangeInput}
                            style={{ width: '400px', marginBottom: '2rem'  }}
                            error={categoryFieldErr}
                            variant="outlined"
                        />
                        <TextField
                            label="URL"
                            name="url"
                            value={url}
                            onChange={handleChangeInput}
                            style={{ width: '400px', marginBottom: '2rem' }}
                            error={urlFieldErr}
                            variant="outlined"
                        />
                        <Typography component="span" variant="body1">
                            Store Image:
                            <Box style={{display: 'flex', width: '400px', height: '50px', border: '1px #556cd6 solid', borderRadius: '5px', justifyContent: 'center', alignItems: 'center'}}>
                            <Input type="file" onChange={selectImage} disableUnderline={true}
                                endAdornment={<InputAdornment position="start"><CameraAltIcon /></InputAdornment>}
                                style={{width: '100%', padding: '10px'}}/>
                            </Box>
                            
                        </Typography>
                    </form>
                    <Button onClick={handleSubmitNewRent}>Submit</Button>
                    <br />
                    {dealInProgress && <CircularProgress />}
                    <Dialog
                        open={fieldErr}
                        onClose={() => { setFieldErr(false); }}
                    >
                        <DialogTitle>Error!</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Please ensure that all fields are entered correctly! You must upload an image as well!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { setFieldErr(false); }} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={finishedTx && (successRenting || errorRenting)}
                        onClose={() => { setFinishedTx(false); setSuccessRenting(false); setErrorRenting(false); }}
                    >
                        <DialogTitle>Renting Space</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {successRenting ? 'You\'ve rent a space!' : (errorRenting ? 'An error occured renting a space!\n': '')}
                                <b>{cidExists? "This image has been used!" : ''}</b>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { setFinishedTx(false); setSuccessRenting(false); setErrorRenting(false); }} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        } else {
            // TODO: properly present rent details
            return <p>{JSON.stringify(chainContext.user.rent)}</p>;
        }
    };

    return renderContext();
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        width: '250px',
    },
}));