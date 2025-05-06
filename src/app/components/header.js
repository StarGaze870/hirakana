export const Header = () => {

    return (
        <div className='main-header-ad-banner d-flex flex-row m-0'>
            <div className="col-1 d-none d-lg-block">
                {/* GAP */}
            </div>
            <div className="col main-header-ad-banner">
                <img
                    src="https://thejapanmedia.com/wp-content/uploads/2021/12/2079_thumb.webp"
                    alt="Ad Banner"
                    className="img-fluid w-100 h-100 object-fit-cover"
                />
            </div>
            <div className="col-1 d-none d-lg-block">
                {/* GAP */}
            </div>
        </div>
    );
}