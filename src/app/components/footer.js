export const Footer = () => {

    return (
        <div className='main-header-ad-banner d-flex flex-row m-0'>
            <div className="col-1 d-none d-lg-block ">
                {/* GAP */}
            </div>

            {/* CENTER */}
            <div className="col main-header-ad-banner d-flex flex-column">
                <div className="d-flex flex-fill justify-content-center pb-4 border-bottom border-2">
                    <img
                        src="https://blog.sakura.co/wp-content/uploads/2022/10/sakuraco_momiji-thumbnail.png"
                        alt="Ad Banner"
                        className="img-fluid w-25 object-fit-cover"
                    />
                </div>
                <div className="d-flex flex-column flex-xl-row pb-5 pt-4">
                    <div className="col">
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-center justify-content-xl-start">
                                <p className="opacity-50 ps-0 ps-xl-5 ">Buy me a <span className="text-decoration-line-through">coffee</span> <span className="fw-bold">ZX4RR</span></p>
                            </div>
                            <div className="d-flex justify-content-around p-3">
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
                            <div className="d-flex justify-content-center justify-content-xl-start ps-0 ps-xl-5 mt-4">
                                <img
                                    src="/zx4rr.png"
                                    alt="Ad Banner"
                                    className="img-fluid w-50 object-fit-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="d-flex justify-content-center pt-5 pt-xl-0">
                            <p className="opacity-50">© 2025 Hirakana</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="d-flex flex-column pt-5 pt-xl-0">
                            <div className="d-flex justify-content-center pt-5 pt-xl-0">
                                <p className="opacity-50">Contact</p>
                            </div>
                            <div className="d-flex justify-content-center pt-5 pt-xl-0">
                                <p className="opacity-50">
                                    Email: <a href="mailto:stargaze.lt@gmail.com" className="text-black">stargaze.lt@gmail.com</a>
                                </p>
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