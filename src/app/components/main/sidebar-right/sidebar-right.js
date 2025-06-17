import ReplayIcon from '@mui/icons-material/Replay';
import { IconButton, Tooltip } from '@mui/material';
import { HirakanaBasicRightSide } from '../../Tabs/Hirakana-Basic-Right';
import YesNoModal from '../../modal/YesNoModal';
import { useEffect } from 'react';

export const MainSidebarRight = ({
    rows = [],
    openRestartYesNoModal = () => { console.error('openRestartYesNoModal is empty') },
    handleRestartOnYesClick = () => { console.error('handleRestartOnYesClick is empty') },
    closeRestartYesNoModal = () => { console.error('closeRestartYesNoModal is empty') },
    isRestartModalOpen,
    paddingTop = "pt-4",
    paddingBottom = "pb-xl-5",
    historyTableOverflowY = "",
    historyTableMinHeight = "",

}) => {

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleKeyDown = (e) => {
        if (e.key == '3') {
            openRestartYesNoModal();
        }
    }

    return (
        <div className="d-flex flex-fill flex-column">
            <div className={`d-flex flex-column flex-lg-grow-1  ${paddingTop} ${paddingBottom}`} style={{ height: 300 }}>
                <div className="d-flex justify-content-between align-items-end px-2 pb-1 pt-1">
                    <span className="opacity-50">History</span>
                    <YesNoModal
                        title='Reset ?'
                        isModalOpen={isRestartModalOpen}
                        handleYesOnClick={handleRestartOnYesClick}
                        handleNoOnClick={closeRestartYesNoModal}
                    />
                    <Tooltip className='' title='Restart' placement='left-start'>
                        <IconButton onClick={openRestartYesNoModal} className="p-0">
                            <ReplayIcon color="primary" className="opacity-75 me-lg-2" />
                        </IconButton>
                    </Tooltip>
                </div>
                <HirakanaBasicRightSide rows={rows} overflowY={historyTableOverflowY} minHeight={historyTableMinHeight} />
            </div>
        </div>
    );
}