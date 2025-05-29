import { MainSidebarRight } from "../main/sidebar-right/sidebar-right";
import { MainSidebarLeft } from "../main/sidebar-left/sidebar-left";
import { useEffect, useRef } from "react";
import { CenterContent } from "../main/center";

export const HirakanaBasic = ({
    // LEFT
    stopwatchStartTimeRef,
    stopwatchElapsedTimeRef,
    isStopwatchRunning,
    setIsStopwatchRunning,
    restartToggled,
    isGameEnded,

    // CENTER
    hirakanaArray,
    tracker,
    selectedCharacter,
    inputValue,
    isCorrect,
    rows = [],
    displayInputBorder,
    handleInputChange,
    handleOnEnter,
    handleOnHintClick,
    difficulty,
    isDifficultyDisabled,
    onDifficultyChange,

    // RIGHT
    openRestartYesNoModal,
    isRestartModalOpen,
    handleRestartOnYesClick,
    closeRestartYesNoModal,
    isHintClicked = false,

}) => {

    const inputRef = useRef();

    // AUTO FOCUS TO INPUT BOX WHEN CHANGING TABS
    useEffect(() => {

        inputRef.current.focus();
        const handleVisibilityChange = () => {
            if (document.hidden) {
                inputRef.current.focus();
            } else {
                inputRef.current.focus();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (

        <div className='d-flex flex-grow-1'>
            <div className='d-flex flex-fill flex-column flex-xl-row px-3 px-xl-5'>

                {/* LEFT SIDE  */}
                <div className="col d-flex order-3 order-xl-1 pt-4">
                    <MainSidebarLeft
                        stopwatchStartTimeRef={stopwatchStartTimeRef}
                        stopwatchElapsedTimeRef={stopwatchElapsedTimeRef}
                        isStopwatchRunning={isStopwatchRunning}
                        setIsStopwatchRunning={setIsStopwatchRunning}
                        restartToggled={restartToggled}
                        isGameEnded={isGameEnded}
                    />
                </div>

                {/* CENTER */}
                <CenterContent
                    isDifficultyDisabled={isDifficultyDisabled}
                    difficulty={difficulty}
                    onDifficultyChange={onDifficultyChange}
                    tracker={tracker}
                    selectedCharacter={selectedCharacter}
                    hirakanaArray={hirakanaArray}
                    handleOnEnter={handleOnEnter}
                    isHintClicked={isHintClicked}
                    isGameEnded={isGameEnded}
                    inputRef={inputRef}
                    handleInputChange={handleInputChange}
                    inputValue={inputValue}
                    displayInputBorder={displayInputBorder}
                    isCorrect={isCorrect}
                    handleOnHintClick={handleOnHintClick}
                />

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