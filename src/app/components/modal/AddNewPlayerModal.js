import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useEffect, useRef } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
};

export default function AddnewPlayerModal({
    isModalOpen = false,
    handleYesOnClick = () => { console.error('handleYesOnClick is not set') },
    handleNoOnClick = () => { console.error('handleNoOnClick is not set') },

}) {

    const inputRef = useRef();

    useEffect(() => {
        if (isModalOpen && inputRef.current) {
            inputRef.current.value = null;
            inputRef.current.focus();
        }
    }, [isModalOpen])

    return (
        <Modal
            keepMounted
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isModalOpen}
            onClose={handleNoOnClick}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isModalOpen}>
                {/* TODO: WRAP WITH FORM */}
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h5" component="h2" className='ps-1 pb-3'>
                        New Player
                    </Typography>
                    <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth inputRef={inputRef}/>
                    <div className='d-flex flex-fill justify-content-between pt-4'>
                        <Button onClick={handleNoOnClick} variant='contained' color='error' className='px-4 py-1'>Cancel</Button>
                        <Button onClick={() => handleYesOnClick(inputRef.current.value)} variant='text' color='error' className='px-5 py-1'>Add</Button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}
