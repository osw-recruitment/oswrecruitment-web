import { useState } from "react";
import "./DetailsForm.scss";

const DetailsForm = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="d-flex justify-content-center details-form">
      {isLoading && (
        <div className="details-form-load">
          <div className="details-form-load-overlay d-flex justify-content-center align-items-center flex-column">
            <div className="spinner-grow text-secondary" role="status" />
            <p className="pt-3 details-form-load-text">Hold on!</p>
          </div>
        </div>
      )}
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSchgVOr3AHPiTzU-gtNAIm8bv4NEKTvhl6AaQzrgy0dOyqDCg/viewform?embedded=true"
        width="100%"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="OSW Recruitment"
        onLoad={() => setIsLoading(false)}
        className={isLoading ? "details-form-hidden" : ""}
      />
    </div>
  );
};

export default DetailsForm;
