import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {

    return (
        <div className='main-header-ad-banner d-flex flex-row m-0'>
            <div className="col-1 d-none d-lg-block ">
                {/* GAP */}
            </div>

            {/* CENTER */}
            <div className="col main-header-ad-banner d-flex flex-column">
                <div className="d-flex flex-fill justify-content-center pb-4">
                    <img
                        src="https://blog.sakura.co/wp-content/uploads/2022/10/sakuraco_momiji-thumbnail.png"
                        alt="Ad Banner"
                        className="img-fluid w-25 object-fit-cover"
                    />
                </div>
                <div className='border-top border-2 mx-4' />
                <div className="d-flex flex-column flex-xl-row pb-4 pt-4">
                    <div className="col main-footer-border border-2">
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-center pt-xl-0 pb-3">
                                {/* <p className="opacity-50 fs-5">Support the Project</p> */}
                                <p className="opacity-75 fs-5">Buy me a <span className="text-decoration-line-through">coffee</span> <span className="fw-bold">ZX4RR</span></p>
                            </div>
                            {/* <div className="d-flex justify-content-center">
                                <p className="opacity-50">Buy me a <span className="text-decoration-line-through">coffee</span> <span className="fw-bold">ZX4RR</span></p>
                            </div> */}
                            <div className="d-flex justify-content-around px-5">
                                <div className="border border-2 rounded-3 p-2">
                                    <img
                                        src="/gcash.png"
                                        alt="Ad Banner"
                                        className="object-fit-cover"
                                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                                    />
                                </div>
                                <div className="border border-2 rounded-3 p-2">
                                    <img
                                        src="/bdo.png"
                                        alt="Ad Banner"
                                        className="object-fit-cover"
                                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                                    />
                                </div>
                            </div>
                            {/* <div className="d-flex justify-content-center justify-content-xl-start ps-0 ps-xl-5 mt-4">
                                <img
                                    src="/zx4rr.png"
                                    alt="Ad Banner"
                                    className="img-fluid w-50 object-fit-cover"
                                />
                            </div> */}
                        </div>
                    </div>
                    <div className="col main-footer-border">
                        <div className="d-flex justify-content-center pt-5 pb-4 pt-xl-0">
                            <p className="opacity-75 fs-5">© 2025 Hirakana</p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p className="opacity-50">All rights reserved</p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p className="opacity-50 m-0">Made with ❤️ in the Philippines</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-center pt-5 pt-xl-0 pb-4">
                                <p className="opacity-75 fs-5">Contact / Hire Me!</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="mailto:stargaze.lt@gmail.com" className="text-black text-decoration-none d-flex">
                                    <MailOutlineIcon className='me-2 opacity-50' />
                                    <p className="opacity-50">
                                        stargaze.lt@gmail.com
                                    </p>
                                </a>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="https://github.com/StarGaze870" target="_blank" className="text-black text-decoration-none d-flex">
                                    <PictureAsPdfIcon className='me-2 opacity-50' />
                                    <p className="opacity-50">
                                        Resume
                                    </p>
                                </a>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="https://github.com/StarGaze870" target="_blank" className="text-black text-decoration-none d-flex">
                                    <GitHubIcon className='me-2 opacity-50' />
                                    <p className="opacity-50">
                                        GitHub
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-1 d-none d-lg-block">
                {/* GAP */}
            </div>
        </div>
    );
}