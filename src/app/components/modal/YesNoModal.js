import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

export default function YesNoModal({
    title = 'Default Title',
    yesValue = 'Yes',
    noValue = 'No',
    isModalOpen = false,
    handleYesOnClick = () => { console.error('handleYesOnClick is not set') },
    handleNoOnClick = () => { console.error('handleNoOnClick is not set') },

}) {

    return (
        <Modal
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
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h5" component="h2" className='ps-1'>
                        {title}
                    </Typography>
                    <div className='d-flex flex-fill justify-content-between pt-4'>
                        <Button onClick={handleNoOnClick} variant='contained' color='error' className='px-5 py-1'>{noValue}</Button>
                        <Button onClick={handleYesOnClick} variant='text' color='error' className='px-5 py-1'>{yesValue}</Button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}
