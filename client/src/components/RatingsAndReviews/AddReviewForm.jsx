import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddReviewForm = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chars: [],
      showStarLabel: false,
      showRatingWarning: false,
      innerWidth: '0%',
      rating: null,
      summary: '',
      body: '',
      recommend: false,
      name: '',
      email: '',
      photos: [],
      // characteristics: {},
    };

    // this.processCharacteristics = this.processCharacteristics.bind(this);
    this.handleStarRatingClick = this.handleStarRatingClick.bind(this);
    // this.handleCharRatingClick = this.handleCharRatingClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fileInput = React.createRef();
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.processCharacteristics();
  // }

  // componentDidUpdate(prevProps) {
  //   const { characteristics } = this.props;
  //   if (JSON.stringify(characteristics) !== JSON.stringify(prevProps.characteristics)) {
  //     this.processCharacteristics();
  //   }
  // }

  handleStarRatingClick(id) {
    this.setState({
      innerWidth: String(id * 20).concat('%'),
      showStarLabel: true,
      rating: id,
    });
  }

  // handleCharRatingClick(id, e) {
  //   const { characteristics } = this.state;
  //   const selection = { ...characteristics };
  //   selection[id] = Number(e.target.value);
  //   this.setState({
  //     characteristics: selection,
  //   });
  //   // console.log(e.target.value);
  //   // console.log(e.target.name);
  // }

  handleInputChange(e) {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  }

  handleFileUpload(e) {
    console.log(this.fileInput.current.files);
    if (this.fileInput.current.files.length > 5) {
      alert('Cannot upload more than 5 images!');
    }
    // console.log(this.fileInput.current.files[0].name);
    // const reader = new FileReader();
    // reader.onloadend = (e) => {
    //   console.log(e.target.result);
    // };
    // const url = reader.readAsDataURL();
    // console.log(url);
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
      // recommend: JSON.parse(recommend),
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

  // processCharacteristics() {
  //   let chars = {};
  //   if (Object.keys(characteristics).length > 0) {
  //     chars = Object.entries(characteristics);
  //     chars.forEach((char) => {
  //       if (true) {
  //         char[1].labels = ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'];
  //       } else if (char[0] === 'Width') {
  //         char[1].labels = ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'];
  //       } else if (char[0] === 'Comfort') {
  //         char[1].labels = ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'];
  //       } else if (char[0] === 'Quality') {
  //         char[1].labels = ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'];
  //       } else if (char[0] === 'Length') {
  //         char[1].labels = ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];
  //       } else if (char[0] === 'Fit') {
  //         char[1].labels = ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'];
  //       }
  //       return char;
  //     });
  //   }
  //   this.setState({ chars });
  // }

  render() {
    const {
      showAddReviewModal, closeReviewFormHandler,
    } = this.props;

    const {
      innerWidth, showStarLabel, rating, chars, body, showRatingWarning,
    } = this.state;

    const starIds = [1, 2, 3, 4, 5];
    const labels = {
      1: 'Poor', 2: 'Fair', 3: 'Average', 4: 'Good', 5: 'Great',
    };

    let reviewFormClass = 'review-form-container';

    if (showAddReviewModal) {
      reviewFormClass = 'review-form-container show-review-form';
    }

    const innerStarStyle = {
      width: innerWidth,
    };

    let starLabel;
    if (showStarLabel) {
      starLabel = (
        <span className="new-review-stars-label">
          {rating === 1 ? `${rating} star` : `${rating} stars`}
          {' - '}
          {labels[rating]}
        </span>
      );
    }

    let ratingWarning;
    if (showRatingWarning) {
      ratingWarning = (
        <div className="rating-warning">
          Please select a star rating before submitting your review!
        </div>
      );
    }

    let reviewBodyCounter;
    if (body.length < 50) {
      reviewBodyCounter = (
        <div className="review-body-counter muted-reminders text-reminder">
          Minimum required characters left:
          {' '}
          {50 - body.length}
        </div>
      );
    } else {
      reviewBodyCounter = (
        <div className="review-body-counter muted-reminders text-reminder">
          Minimum reached.
        </div>
      );
    }

    return (
      <div className={reviewFormClass}>
        <div className="review-form-content">
          <span className="close-modal" onClick={closeReviewFormHandler} role="presentation"><i className="fas fa-times" /></span>
          <h1 className="review-form-title">Write Your Review</h1>
          <div className="review-form-header">
            <span className="review-section-header">Your product rating</span>
            <span className="required-review-mark">
              <i className="fas fa-asterisk" />
              Required
            </span>
          </div>
          <form id="add-review-form" onSubmit={this.handleFormSubmit}>
            <label htmlFor="overall-rating">
              <div className="asterisk-wrapper">
                Overall rating
                <span className="required-review-mark">
                  <i className="fas fa-asterisk" />
                </span>
              </div>
              <span className="muted-reminders">Click to rate!</span>
              <div id="overall-rating">
                <div className="stars-outer new-review-stars">
                  {starIds.map((id) => (
                    <i
                      className="far fa-star"
                      key={id}
                      onClick={() => this.handleStarRatingClick(id)}
                      role="presentation"
                    />
                  ))}
                  <div className="stars-inner new-review-stars" style={innerStarStyle}>
                    {starIds.map((id) => (
                      <i
                        className="fas fa-star"
                        key={id}
                        onClick={() => this.handleStarRatingClick(id)}
                        role="presentation"
                      />
                    ))}
                  </div>
                </div>
                {starLabel}
              </div>
            </label>
            <div id="recommend-product">
              <label htmlFor="recommend-product">
                <div className="asterisk-wrapper">
                  Do you recommend this product?
                  <span className="required-review-mark">
                    <i className="fas fa-asterisk" />
                  </span>
                </div>
                <div className="radio-button-container">
                  <label htmlFor="recommend">
                    <input
                      type="radio"
                      name="recommend"
                      id="recommend"
                      value="true"
                      onChange={this.handleInputChange}
                      required
                    />
                    Yes
                  </label>
                  <label htmlFor="not-recommend">
                    <input
                      type="radio"
                      name="recommend"
                      id="not-recommend"
                      value="false"
                      onChange={this.handleInputChange}
                      required
                    />
                    No
                  </label>
                </div>
              </label>
            </div>

            <div className="text-review-container">
              <div className="user-review-summary">
                <label htmlFor="user-review-summary">
                  <div className="asterisk-wrapper">
                    Review Summary
                  </div>
                  <input
                    type="text"
                    id="user-review-summary"
                    name="summary"
                    maxLength="60"
                    // size="60"
                    onChange={this.handleInputChange}
                  />
                </label>
              </div>
              <div className="user-review-body">
                <label htmlFor="user-review-body">
                  <div className="asterisk-wrapper">
                    Your Review
                    <span className="required-review-mark">
                      <i className="fas fa-asterisk" />
                    </span>
                  </div>
                  <textarea
                    id="user-review-body"
                    name="body"
                    required
                    rows="20"
                    cols="50"
                    placeholder="Why did you like the product or not?"
                    minLength="50"
                    maxLength="1000"
                    onChange={this.handleInputChange}
                  />
                </label>
                {reviewBodyCounter}
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
              <div className="review-user-nickname">
                <label htmlFor="review-user-nickname">
                  <div className="asterisk-wrapper">
                    What is your nickname?
                    <span className="required-review-mark">
                      <i className="fas fa-asterisk" />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="review-user-nickname"
                    name="name"
                    required
                    maxLength="60"
                    size="20"
                    placeholder="Example: jackson11!"
                    onChange={this.handleInputChange}
                  />
                </label>
                <div className="muted-reminders text-reminder">
                  For privacy reasons, do not use your full name or email address
                </div>
              </div>
              <div className="review-user-email">
                <label htmlFor="review-user-email">
                  <div className="asterisk-wrapper">
                    What is your email?
                    <span className="required-review-mark">
                      <i className="fas fa-asterisk" />
                    </span>
                  </div>
                  <input
                    type="email"
                    id="review-user-email"
                    name="email"
                    required
                    maxLength="60"
                    size="30"
                    placeholder="Example: jackson11@email.com"
                    onChange={this.handleInputChange}
                  />
                </label>
                <div className="muted-reminders text-reminder">
                  For authentication reasons, you will not be emailed
                </div>
              </div>
            </div>
            <div className="submit-button-holder">
              <input
                type="submit"
                value="Submit Review"
                className="interactive-button"
              />
              {ratingWarning}
            </div>
          </form>
        </div>
      </div>
    );
  }
};

AddReviewForm.propTypes = {

  showAddReviewModal: PropTypes.bool.isRequired,
  closeReviewFormHandler: PropTypes.instanceOf(Function).isRequired,
};

export default AddReviewForm;
