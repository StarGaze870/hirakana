import { IconButton, MenuItem, Select, Tooltip } from "@mui/material";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { MainSidebarRight } from "../main/sidebar-right";
import { MainSidebarLeft } from "../main/sidebar-left";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useRef } from "react";

export const HirakanaBasic = ({
    hirakanaArray = [],
    tracker = new Set(),
    selectedCharacter = null,
    inputValue = '',
    isCorrect = null,
    rows = [],
    displayInputBorder = false,
    handleInputChange = () => { console.error('handleInputChange is not set') },
    handleOnEnter = () => { console.error('handleOnEnter is not set') },
    handleOnHintClick = () => { console.error('handleOnHintClick is not set') },
    openRestartYesNoModal,
    isRestartModalOpen,
    handleRestartOnYesClick,
    closeRestartYesNoModal,
    isHintClicked = false,

}) => {

    const inputRef = useRef();

    const hintOpacity = isHintClicked ? 'opacity-100' : 'opacity-50';
    const hintColor = isHintClicked ? '' : 'warning';
    const hintToolTip = isHintClicked ? 'Hint Used' : 'Hint';

    const onHintClickLocal = () => {
        handleOnHintClick();
        inputRef.current.focus();
    }

    return (

        <div className='d-flex flex-grow-1'>
            <div className='d-flex flex-fill flex-column flex-xl-row px-3 px-xl-5'>

                {/* LEFT SIDE  */}
                <div className="col d-flex order-3 order-xl-1 pt-4">
                    <MainSidebarLeft />
                </div>

                {/* CENTER */}
                <div className='col order-1 order-xl-2 d-flex flex-column pb-xl-4 pb-xxl-2 pt-4'>
                    {/* DIFFICULTY */}
                    <div className="d-flex flex-column px-4">
                        <span className="opacity-50 ps-2 pb-1 pt-1">Difficulty</span>
                        <Select
                            style={{ minWidth: '10rem', maxHeight: '57px', minHeight: '57px' }}
                            fullWidth
                            value={21}
                        // value={age}
                        // onChange={handleChange}
                        >
                            <MenuItem value={20}>Easy</MenuItem>
                            <MenuItem value={21}>Medium</MenuItem>
                            <MenuItem value={22}>Hard</MenuItem>
                        </Select>
                    </div>
                    {/* SCORE */}
                    <div className='col flex-fill d-flex pt-4 justify-content-center'>
                        <p className="m-0 opacity-25 fs-5 pt-xl-2">
                            {tracker.size < 1 ? 1 : tracker.size} / {hirakanaArray.length}
                        </p>
                    </div>
                    {/* TEXT */}
                    <div className='col flex-fill d-flex justify-content-center align-items-center flex-column'>
                        <span className='col fw-bold text-center' style={{ fontSize: '11em' }}>
                            {selectedCharacter != null ? hirakanaArray[selectedCharacter][0] : '. . .'}
                        </span>
                    </div>
                    {/* INPUT */}
                    <div className='col flex-fill d-flex justify-content-center align-items-center px-4 pb-3position-relative'>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleOnEnter();
                            }}
                            className="position-relative">
                            <Tooltip className="position-absolute p-0" style={{ top: '-1.9rem', left: '0.3rem', zIndex: 5 }} title='Library' placement='right-start'>
                                <span>
                                    <IconButton className="p-0">
                                        <MenuBookIcon className="opacity-50" color="info" />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <Tooltip className="position-absolute p-0" style={{ top: '-1.9rem', right: '0.3rem', zIndex: 5 }} title={hintToolTip} placement='right-start'>
                                <span>
                                    <IconButton className="p-0" onClick={onHintClickLocal} disabled={isHintClicked}>
                                        <EmojiObjectsIcon className={hintOpacity} color={hintColor} />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <input
                                ref={inputRef}
                                className='w-100'
                                type="text"
                                placeholder="入力してください"
                                onChange={handleInputChange}
                                value={inputValue}
                                style={{
                                    textAlign: 'center',
                                    height: '80px',
                                    fontSize: '2rem',
                                    border: displayInputBorder ? isCorrect ? '15px solid green' : '15px solid red' : '',
                                    borderRadius: '7px',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </form>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="col order-2 order-xl-3 d-flex">
                    <MainSidebarRight
                        rows={rows}
                        openRestartYesNoModal={openRestartYesNoModal}
                        isRestartModalOpen={isRestartModalOpen}
                        handleRestartOnYesClick={handleRestartOnYesClick}
                        closeRestartYesNoModal={closeRestartYesNoModal}
                    />
                </div>

            </div>
        </div >
    );
}