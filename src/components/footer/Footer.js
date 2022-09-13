import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-details d-flex">
        <div className="footer-backdrop px-5 py-4 d-flex justify-content-between">
          <div className="footer-details-location px-2 d-flex justify-content-center align-items-center flex-column">
            <i className="bi bi-geo-alt footer-details-location-icon"></i>
            <p>No 88, Dambakandawattha</p>
            <p>Boyagane, Kurunegala 60000</p>
            <p>Sri Lanka</p>
          </div>
          <div className="footer-details-email px-2 d-flex justify-content-center align-items-center flex-column">
            <i class="bi bi-envelope-open footer-details-location-icon"></i>
            <p>
              <a href="mailto:contact@oswrecruitment.com">
                Email: contact@oswrecruitment.com
              </a>
            </p>
          </div>
          <div className="footer-details-phone px-2 d-flex justify-content-center align-items-center flex-column">
            <i class="bi bi-telephone-inbound footer-details-location-icon"></i>
            <p>Telephone: +64277600103</p>
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
