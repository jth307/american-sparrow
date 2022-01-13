import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddQForm = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRatingWarning: false,
      innerWidth: '0%',
      summary: '',
      body: '',
      name: '',
      email: '',
      photos: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.fileInput = React.createRef();
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }



  handleInputChange(e) {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  }

  handleFileUpload(e) {
    console.log(this.fileInput.current.files);
    if (this.fileInput.current.files.length > 5) {
      alert('Cannot upload more than 5 images!');
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { closeReviewFormHandler } = this.props;
    const {
      rating, summary, body, recommend, name, email, photos,
    } = this.state;
    const data = {
      product_id: '40348',
      rating,
      summary,
      body,
      name,
      email,
      photos,
    };
    if (data.rating === null) {
      this.setState({ showRatingWarning: true });
    } else {
      this.setState({ showRatingWarning: false });
      axios.post('/reviews', data)
        .then(() => closeReviewFormHandler())
        .catch((err) => {
          console.error(err);
        });
    }
  }

  render() {
    const {
      showAddReviewModal, closeReviewFormHandler,
    } = this.props;

    const {
      innerWidth, showStarLabel, rating, chars, body, showRatingWarning,
    } = this.state;


    let reviewFormClass = 'review-form-container';

    if (showAddReviewModal) {
      reviewFormClass = 'review-form-container show-review-form';
    }

    const innerStarStyle = {
      width: innerWidth,
    };



    return (
      <div className={reviewFormClass}>
        <div className="review-form-content">
          <span className="close-modal" onClick={closeReviewFormHandler} role="presentation"><i className="fas fa-times" /></span>
          <div className="review-form-header">
            <span className="review-section-header">Submit Your Question</span>
          </div>
          <form id="add-review-form" onSubmit={this.handleFormSubmit}>
          <div className="review-user-nickname">
                <label htmlFor="review-user-nickname">
                  <div className="asterisk-wrapper">
                    Your username
                  </div>
                  <input
                    type="text"
                    id="review-user-nickname"
                    name="name"
                    required
                    maxLength="60"
                    size="20"
                    placeholder=" Example: jackson11!"
                    onChange={this.handleInputChange}
                  />
                </label>
              </div>
              <div className="review-user-email">
                <label htmlFor="review-user-email">
                  <div className="asterisk-wrapper">
                    Your email
                  </div>
                  <input
                    type="email"
                    id="review-user-email"
                    name="email"
                    required
                    maxLength="60"
                    size="30"
                    placeholder=" Example: jackson11@email.com"
                    onChange={this.handleInputChange}
                  />
                </label>

              </div>
            <div className="text-review-container">
              <div className="user-review-body">
                <label htmlFor="user-review-body">
                  <div className="asterisk-wrapper">
                    Your Question
                  </div>
                  <textarea
                    id="user-review-body"
                    name="body"
                    required
                    rows="20"
                    cols="50"
                    maxLength="200"
                    onChange={this.handleInputChange}
                  />
                </label>
              </div>
              {/* <div className="upload-review-photo">
                <label htmlFor="upload-review-photo">
                  <div className="upload-photo-prompt">
                    Please upload your photos here:
                  </div>
                  <input
                    type="file"
                    ref={this.fileInput}
                    id="upload-review-photo"
                    name="photos"
                    accept="image/png, image/jpeg"
                    multiple
                    onChange={this.handleFileUpload}
                  />
                </label>
                <div>
                  <button type="submit" value="upload">Upload</button>
                </div>
              </div> */}

            </div>
            <div className="submit-button-holder">
              <input
                type="submit"
                value="Submit Question"
                className="interactive-button"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
};

AddQForm.propTypes = {

  showAddReviewModal: PropTypes.bool.isRequired,
  closeReviewFormHandler: PropTypes.instanceOf(Function).isRequired,
};

export default AddQForm;
