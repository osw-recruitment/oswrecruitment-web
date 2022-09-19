import { Link } from "react-router-dom";
import Typed from "react-typed";
import Footer from "../../components/footer/Footer";
import "./Home.scss";

const Home = () => {
  return (
    <div className="app-container">
      <div className="app-backdrop">
        <div className="d-flex justify-content-center align-items-center h-100 app-brand flex-column">
          <p className="app-brand-title">OSW Recruitment</p>
          <Typed
            className="app-brand-content"
            strings={[
              "Are you looking for overseas jobs ?",
              "We are here to help you",
            ]}
            typeSpeed={150}
            backSpeed={150}
            loop
          />
          <div className="app-brand-contact d-flex">
            <Link to={"/submit-cv"}>
              <button className="app-brand-button mt-3 me-2">
                Send your details
                <i className="bi bi-send ms-2 app-brand-button-icon"></i>
              </button>
            </Link>
            <button className="app-brand-button mt-3 ms-2">
              <a href="mailto:contact@oswrecruitment.com?subject=CV%20for%20Overseas%20Job%20Opportunities%20">
                Contact Us
                <i className="bi bi-telephone-forward ms-2 app-brand-button-icon"></i>
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="app-content app-row-container">
        <p className="app-title">About the company</p>
        <p className="app-text">
          We are a Sri Lankan-based offshore recruitment agency and we recruit
          workers for the international market. OSWRecruitment Agency is one of
          the leading global recruitment, staffing, and executive search
          companies in Sri Lanka. We operate through a network of our worldwide
          teams, with specialists in recruitment for different industries.
        </p>
        <p className="app-text">
          If you are on the lookout for highly experienced and qualified
          employees, then rest assured that our manpower supply company has the
          potential to offer premium consultancy services dedicated to
          understanding your individual needs and providing the finest workers
          within your given time frame.
        </p>
      </div>
      <div className="app-description app-row-container d-flex justify-content-center">
        <div className="app-description-card flex-column p-3 me-5">
          <p className="app-title">Vision</p>
          <p className="app-text">
            Our vision is to be one of the leading Human Resource management
            companies catering to the needs of employers and the best platform
            for candidates to identify and follow inspiring careers with their
            ideal organization.
          </p>
        </div>
        <div className="app-description-card flex-column p-3 ms-5">
          <p className="app-title">Mission</p>
          <p className="app-text">
            Our mission is to be a preferred and trustworthy recruitment partner
            to both our clients and candidates and world’s best at helping
            clients to achieve success through professional service
          </p>
        </div>
      </div>

      <div className="app-expertise app-row-container d-flex align-items-center flex-column justify-content-center">
        <p className="app-title">Our Expertise</p>
        <div className="app-expertise-container d-flex justify-content-center">
          <div className="app-expertise-card d-flex justify-content-center align-items-center flex-column mx-3">
            <i className="bi bi-hospital app-icon"></i>
            <p className="app-text">Healthcare</p>
          </div>
          <div className="app-expertise-card  d-flex justify-content-center align-items-center flex-column mx-3">
            <i className="bi bi-bag-heart app-icon"></i>
            <p className="app-text">Hospitality</p>
          </div>
          <div className="app-expertise-card  d-flex justify-content-center align-items-center flex-column mx-3">
            <i className="bi bi-cone-striped app-icon"></i>
            <p className="app-text">Engineering and Construction</p>
          </div>
          <div className="app-expertise-card  d-flex justify-content-center align-items-center flex-column mx-3">
            <i className="bi bi-laptop app-icon"></i>
            <p className="app-text">Information Technology</p>
          </div>
        </div>
      </div>
      <div className="app-hiw app-row-container">
        <p className="app-title">How it works</p>
        <div className="app-hiw-container d-flex justify-content-around align-items-center pt-4">
          <div className="app-hiw-container-card">
            <p className="app-hiw-index">01</p>
            <div className="app-hiw-backdrop">
              <i className="bi bi-info-circle"></i>
              <p className="app-text">Send us your details</p>
            </div>
          </div>
          <div className="app-hiw-container-card">
            <p className="app-hiw-index">02</p>
            <div className="app-hiw-backdrop">
              <i className="bi bi-briefcase"></i>
              <p className="app-text">
                We will find the correct job offer for you
              </p>
            </div>
          </div>
          <div className="app-hiw-container-card">
            <p className="app-hiw-index">03</p>
            <div className="app-hiw-backdrop">
              <i className="bi bi-pass"></i>
              <p className="app-text">Help you to apply for the work visa</p>
            </div>
          </div>
          <div className="app-hiw-container-card">
            <p className="app-hiw-index">04</p>
            <div className="app-hiw-backdrop">
              <i className="bi bi-airplane-engines"></i>
              <p className="app-text">
                You can come to your dream country to work
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
