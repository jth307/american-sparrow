import React from 'react';
import saleTimer from './helpers/saleTimer';
import server from './helpers/Axios';

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: '',
      prodsInfo: [],
    };
  }

  componentDidMount() {
    const oneDay = 24 * 60 * 60;
    const display = document.querySelector('#timer');
    saleTimer(oneDay, display);
    this.getRelatedData(this.props.currProdId);
  }

  onChange(e) {
    const { prodsInfo } = this.state;
    const userInput = e.currentTarget.value;

    const filteredOptions = prodsInfo.filter(
      (option) => option.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value,
    });
  }

  onClick(e) {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText,
    });
  }

  onKeyDown(e) {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
        this.setState({
          activeOption: 0,
          showOptions: false,
          userInput: filteredOptions[activeOption].name,
        });
        setTimeout(() => {this.changeProduct();}, 500)
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  }

  getRelatedData() {
    server.get(`/related/${this.props.currProdId}`)
      .then((res) => this.setState({
        prodsInfo: res.data[0],
      }))
      .catch((err) => console.log(err));
  }

  changeProduct() {
    const {changeProductHandler} = this.props;
    let productId;
    this.state.prodsInfo.forEach((item) => {
      if (item.name === this.state.userInput) {
        productId = item.id;
      }
    });
    changeProductHandler(productId);
    this.setState({
      userInput: '',
    });
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeOption, filteredOptions, showOptions, userInput,
      },
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((option, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} onClick={onClick.bind(this)}>
                  {option.name}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>Not Found</em>
          </div>
        );
      }
    }

    return (
      <div>
        <div className="titlebar">
          <img className="logo" src="/assets/logo5.png" alt="logo Icon" />
          {/* <input
            type="text"
            className="product-search"
            onChange={onChange.bind(this)}
            onKeyDown={onKeyDown.bind(this)}
            value={userInput}
          /> */}
          {/* <input type="submit" value="hi" className="search-bton" /> */}
          {/* <img onClick={()=>(this.changeProduct())} className="product-searchh" src="/assets/magny.png" alt="magny Icon" /> */}
        {/* </div>
        <div className="dropdown">
          {optionList}
        </div> */}
        <div className='banner-menuItems'>
        {/* <div onClick={() => (history.push('/free'))}>Free Stocks</div> */}
        <div>Women</div>
        <div>Men</div>
        <div>Shoes</div>
        <div>Accessories</div>
        <div>Cart</div>
        </div>
        </div>
        <div className="mini-banner">
          END OF SUMMER SALE! BUY ONE GET ONE 50% OFF! SALE ENDS IN <span id="timer"></span> MINUTES!
        </div>
      </div>
    );
  }
}

export default Banner;
