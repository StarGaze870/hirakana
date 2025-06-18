import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PortraitIcon from '@mui/icons-material/Portrait';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {

    return (
        <footer>
            <div className='main-header-ad-banner d-flex flex-row m-0 pt-5'>

                <div className="col-1 d-none d-md-block ">
                    {/* GAP */}
                </div>

                {/* CENTER */}
                <div className="col main-header-ad-banner d-flex flex-column">
                    <div className="d-flex flex-fill justify-content-center pb-4">
                        <img
                            src="https://blog.sakura.co/wp-content/uploads/2022/10/sakuraco_momiji-thumbnail.png"
                            alt="Ad Banner"
                            className="img-fluid object-fit-cover px-4"
                            style={{ maxHeight: 300 }}
                        />
                    </div>

                    {/* HORIZONTAL LINE */}
                    <div className='border-top border-2 mx-4' />

                    <div className="d-flex flex-column flex-sm-row pb-3 pt-4">

                        {/* COLUMN 1 */}
                        <div className="col main-footer-border pb-4">
                            <div className='d-flex justify-content-center'>
                                <div className='d-flex flex-column'>
                                    <div className="d-flex pb-2">
                                        <h6 className="opacity-75 fs-6 fw-bold">© {new Date().getFullYear()} Hirakana</h6>
                                    </div>
                                    <div className="d-flex">
                                        <p className="opacity-50 mb-2">All rights reserved</p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="opacity-50 mb-2">Made with ❤️ in 🇯🇵</p>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <p className="opacity-50 m-0">About</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* COLUMN 2 */}
                        <div className="col main-footer-border pb-4">
                            <div className='d-flex justify-content-center'>
                                <div className="d-flex flex-column">
                                    <div className="d-flex pb-2 ps-2">
                                        <h6 className="opacity-75 fs-6 fw-bold">Resources</h6>
                                    </div>
                                    <div className="d-flex">
                                        <a href="mailto:stargaze.lt@gmail.com" className="footer-links text-decoration-none d-flex">
                                            <GitHubIcon className='me-2 opacity-50' />
                                            <p className="opacity-50  mb-2">
                                                GitHub
                                            </p>
                                        </a>
                                    </div>
                                    <div className="d-flex">
                                        <a href="https://www.linkedin.com/in/ljtudtud/" target="_blank" className="footer-links text-decoration-none d-flex">
                                            <PictureAsPdfIcon className='me-2 opacity-50' />
                                            <p className="opacity-50 mb-2">
                                                Resume
                                            </p>
                                        </a>
                                    </div>
                                    <div className="d-flex">
                                        <a href="https://www.facebook.com/eljeee.me/" target="_blank" className="footer-links text-decoration-none d-flex">
                                            <PortraitIcon className='me-2 opacity-50' />
                                            <p className="opacity-50">
                                                Portfolio
                                            </p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* COLUMN 3 */}
                        <div className="col">
                            <div className='d-flex justify-content-center'>
                                <div className="d-flex flex-column">
                                    <div className="d-flex pb-2 ps-3">
                                        <h6 className="opacity-75 fs-6 fw-bold">Contacts</h6>
                                    </div>
                                    <div className="d-flex">
                                        <a href="mailto:stargaze.lt@gmail.com" className="footer-links text-decoration-none d-flex">
                                            <MailOutlineIcon className='me-2 opacity-50' />
                                            <p className="opacity-50 mb-2">
                                                Email
                                            </p>
                                        </a>
                                    </div>
                                    <div className="d-flex">
                                        <a href="https://www.linkedin.com/in/ljtudtud/" target="_blank" className="footer-links text-decoration-none d-flex">
                                            <LinkedInIcon className='me-2 opacity-50' />
                                            <p className="opacity-50 mb-2">
                                                LinkedIn
                                            </p>
                                        </a>
                                    </div>
                                    <div className="d-flex">
                                        <a href="https://www.facebook.com/eljeee.me/" target="_blank" className="footer-links text-decoration-none d-flex">
                                            <FacebookIcon className='me-2 opacity-50' />
                                            <p className="opacity-50">
                                                Facebook
                                            </p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-1 d-none d-md-block">
                    {/* GAP */}
                </div>

            </div>
        </footer>
    );
}