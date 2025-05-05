export const HirakanaBasic = ({
    hirakanaArray = [],
    tracker = new Set(),
    selectedCharacter = null,
    inputValue = '',
    isCorrect = null,
    displayInputBorder = false,
    handleInputChange = () => { },
}) => {

    return (

        <div className='d-flex flex-grow-1'>
            {/* TODO: MUST BE SCROLLABLE IF TABLET DIMENSIONS OR LOWER INSTEAD IF FLEX-GROW */}
            <div className='d-flex flex-grow-1 flex-column flex-lg-row'>
                <div className='col'>

                    {/* TODO: IDK */}
                </div>
                <div className='col d-flex flex-column'>
                    {/* SCORE */}
                    <div className='col flex-fill d-flex justify-content-center pt-4'>
                        <h1 className='m-0'>
                            {tracker.size < 1 ? 1 : tracker.size} / {hirakanaArray.length}
                        </h1>
                    </div>
                    {/* TEXT */}
                    <div className='col flex-fill d-flex justify-content-center'>
                        <span className='fw-bold text-center' style={{ fontSize: '12em' }}>
                            {selectedCharacter != null ? hirakanaArray[selectedCharacter][0] : '. . .'}
                        </span>
                    </div>
                    {/* INPUT */}
                    <div className='col flex-fill d-flex justify-content-center px-4 pb-4'>
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
                    </div>
                </div>
                <div className='col'>
                    {/* TODO: TABLE SCORE */}

                </div>
            </div>
        </div >


    );
}