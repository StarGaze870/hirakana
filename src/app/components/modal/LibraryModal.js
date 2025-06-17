import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import LibraryTable from './LibraryModalTableContent';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { CreateRowsForTableForm } from '../main/mainFunctions';
import { Hiragana } from '../../../../public/texts/Hiragana';
import { Katakana } from '../../../../public/texts/Katakana';
import { IconButton } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 350,
    width: '90vw',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: 3,
    px: 3,
    py: 4,
};

export default function LibraryModal({
    isModalOpen = false,
    handleNoOnClick = () => { console.error('handleNoOnClick is not set') },

}) {

    const [hiraganaData, setHiraganaData] = useState([]);
    const [katakanaData, setKatakanaData] = useState([]);

    useEffect(() => {

        setHiraganaData(CreateRowsForTableForm(Hiragana));
        setKatakanaData(CreateRowsForTableForm(Katakana));

    }, [])

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
                <Box sx={style}>
                    <IconButton onClick={handleNoOnClick} className='position-absolute end-0 top-0 opacity-50'>
                        <CloseIcon color='error' className='fs-5'/>
                    </IconButton>
                    <div className='d-flex w-100 justify-content-between flex-column flex-xl-row overflow-y-auto sidebar-left-library-modal-content' style={{ height: '80vh' }}>
                        <div className='d-flex flex-column align-items-center pe-xl-4 pb-5 pb-xl-0 sidebar-left-library-modal-snap-item'>
                            <h2 className='pb-3'>Hiragana</h2>
                            <LibraryTable rows={hiraganaData} />
                        </div>
                        <div className='d-flex flex-column align-items-center ps-xl-4 sidebar-left-library-modal-snap-item'>
                            <h2 className='pb-3'>Katakana</h2>
                            <LibraryTable rows={katakanaData} />
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}
