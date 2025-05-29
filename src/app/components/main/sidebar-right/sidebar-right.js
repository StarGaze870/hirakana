import ReplayIcon from '@mui/icons-material/Replay';
import { IconButton, Tooltip } from '@mui/material';
import { HirakanaBasicRightSide } from '../../Tabs/Hirakana-Basic-Right';
import YesNoModal from '../../modal/rename';

export const MainSidebarRight = ({
    rows = [],
    openRestartYesNoModal = () => { console.error('openRestartYesNoModal is empty') },
    handleRestartOnYesClick = () => { console.error('handleRestartOnYesClick is empty') },
    closeRestartYesNoModal = () => { console.error('closeRestartYesNoModal is empty') },
    isRestartModalOpen,

}) => {

    return (
        <div className="d-flex flex-fill flex-column">
            <div className={`d-flex flex-column flex-lg-grow-1 pt-4 pb-xl-5`} style={{ height: 300 }}>
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
                <HirakanaBasicRightSide rows={rows} />
            </div>
        </div>
    );
}