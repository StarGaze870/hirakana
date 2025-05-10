import { IconButton, MenuItem, Select, Tooltip } from "@mui/material";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { SidebarRight } from "../main/sidebar-right";

export const HirakanaBasic = ({
    hirakanaArray = [],
    tracker = new Set(),
    selectedCharacter = null,
    inputValue = '',
    isCorrect = null,
    rows = [],
    displayInputBorder = false,
    handleInputChange = () => { },
    handleOnEnter = () => { },
}) => {

    return (

        <div className='d-flex flex-grow-1'>
            {/* LEFT SIDE  */}
            <div className='d-flex flex-grow-1 flex-column flex-lg-row'>
                <div className="col">
                    <div className="d-flex flex-column object-fit-contain px-4 px-lg-0 ps-lg-5 pt-4">
                        <span className="opacity-50 ps-2 pb-1 pt-1">Difficulty</span>
                        {/* <h5 className="m-0 object-fit-contain pe-3" style={{ whiteSpace: 'nowrap' }}>Difficulty <span>:</span></h5> */}
                        <Select
                            style={{ minWidth: '10rem', maxHeight: '57px', minHeight: '57px' }}
                            fullWidth
                            value={21}
                        // value={age}
                        // onChange={handleChange}
                        // displayEmpty
                        >
                            <MenuItem value={20}>Easy</MenuItem>
                            <MenuItem value={21}>Medium</MenuItem>
                            <MenuItem value={22}>Hard</MenuItem>
                        </Select>
                    </div>
                </div>
                {/* CENTER */}
                <div className='col d-flex flex-column'>
                    {/* SCORE */}
                    <div className='col flex-fill d-flex pt-4 justify-content-center'>
                        <p className="m-0 opacity-25 fs-5 pt-3">
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
                            <Tooltip className="position-absolute p-0" style={{ top: '-1.9rem', right: '0.3rem', zIndex: 5 }} title='Hint' placement='right-start'>
                                <IconButton>
                                    <EmojiObjectsIcon className="opacity-50" color="warning" />
                                </IconButton>
                            </Tooltip>
                            <input
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
                <div className="col px-4 px-lg-0 pe-lg-5 d-flex">
                    <SidebarRight />
                </div>
            </div>
        </div >
    );
}