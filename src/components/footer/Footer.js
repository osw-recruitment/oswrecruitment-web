import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-details d-flex">
        <div className="footer-backdrop px-5 py-4 d-flex justify-content-between">
          <div className="footer-details-location px-2 d-flex justify-content-center align-items-center flex-column">
            <i className="bi bi-geo-alt footer-details-location-icon"></i>
            <p>No 28, Kovila Road</p>
            <p>Kurunegala 60000</p>
            <p>Sri Lanka</p>
          </div>
          <div className="footer-details-email px-2 d-flex justify-content-center align-items-center flex-column">
            <i className="bi bi-envelope-open footer-details-location-icon"></i>
            <p>
              <a href="mailto:contact@oswrecruitment.com">
                Email: contact@oswrecruitment.com
              </a>
            </p>
          </div>
          <div className="footer-details-phone px-2 d-flex justify-content-center align-items-center flex-column">
            <i className="bi bi-telephone-inbound footer-details-location-icon"></i>
            <p>
              <a href="tel:+64-220-143-109">
                Mobile: +64220143109, +94713332696, +94759932324
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-socials d-flex justify-content-center align-items-center">
        OSW Recruitment (Pvt) Ltd
      </div>
    </div>
  );
};

export default Footer;
