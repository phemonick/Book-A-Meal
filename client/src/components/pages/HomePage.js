import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { logout } from '../../actions/auth';
import { Footer, MenuCard, OrderItem, FoodModal, MenuNav } from '../common/';
import { menuForToday, addMealToOrder, removeOrder, increaseQuantity, requestForOrder, isOverlayOpened, clearOrder, successState, errState } from '../../actions';
import img from '../../static/images/spice1.jpg';
import best from '../../static/images/best-now.png';

class HomePage extends Component {

  constructor(){
    super();
    this.state = {
      isToggled: false
    }
  }
  componentWillMount() {
    console.log(this.props.isAuthenticated);
    const newLocal = this.props.role === 'user';
    if (!(newLocal)) {
      console.log('Going back because phemmy is a smart learner');
      this.props.history.push('/login');
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    const today = new Date();
    console.log(today)
    const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const month = today.getMonth()+1 < 10 ? `0${today.getMonth()+1}` : today.getMonth()+1;
    const todaysDate = `${today.getFullYear()}-${month}-${day}`;
    console.log( day, month)
    this.props.menuForToday(todaysDate);
  }
  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  componentDidUpdate(){
    if (this.props.orderSuccessful === true) {
      swal("Meal Ordered", 'Your meal has been ordered successfully' , "success");
      this.props.successState(false);
      this.toggle();
      this.props.clearOrder()
    }
    if (this.props.isOrderError === true) {
      swal("Order error", 'error ordering meal' , "error");
      this.props.errState(false);
    }
     
  }
  addMealToOrder = (meal) => {
    if(this.props.placedOrders.length){
      let alreadyExist = this.props.placedOrders.some((item) => meal.id === item.mealId);
      console.log(this.props.placedOrders.some((item) => meal.id === item.id))
      return (
        alreadyExist? '' : this.props.addMealToOrder(meal)
      )
    }else{
      console.log(meal)
      return this.props.addMealToOrder(meal)
    }
    
    // this.props.addMealToOrder(meal) 
  }
  menuCards = () => (
    this.props.menus.map((meal, key) => (
      meal.Meal !== null ? <MenuCard key={key} meal={meal.Meal} addMealToOrder=
      {this.addMealToOrder} isOverlayOpened={this.props.isOverlayOpened} /> : ''
    )
  )
  )
  orderCard = () => (
    this.props.placedOrders.map((order, key) => <OrderItem key={key}
     increaseQuantity={this.props.increaseQuantity} order={order} removeOrder=
     {this.props.removeOrder} /> )
  )
  noMenu = () => (
    <div className='no-menu-container'>
      MENU HAS NOT BEEN SET FOR TODAY
    </div>
  )
  openModal = () => {
    console.log('modal opened');
    this.myVal.setAttribute()
    
  }
  noOrder = () => (
    <div>
      <h1>NO ORDER PLACED</h1>
    </div>
  )
  submit = () => {
    this.props.requestForOrder(this.props.placedOrders)
    console.log('clicked sub')
  }
  subTotal = () => {
    let total = 0;
    this.props.placedOrders.map(cost => {
      let newCost = cost.quantity * cost.mealCost
      total += newCost;
      // console.log(total)
    })
    return total
  }
  vat = () => {
    // (5/100 * (this.subTotal())).toFixed(2)
    let tax = 5/100
    let myTax = tax * this.subTotal();
    return myTax.toFixed(2)
  }
  // clearCat = () => {
  //   this.props.clearOrder()
  // }
  toggle = () => {
    console.log(this.state.isToggled)
    this.setState({
      isToggled: !this.state.isToggled
    })
  }
  deleteMeal = () => {
    swal({
      title: "Are you sure?",
      text: "Once Cleared, you will not be able to recover this orders!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.toggle();
        this.props.clearOrder();
        swal("Meal cleared successfully");
      } else {
        swal("Your meal is safe!");
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="top-content2">
          <div className="topblur">
            <h1 className="top-content-h">THE MENU</h1>
            <p className="top-content-line">_____________________________</p>
          </div>
        </div>
        <nav>
          <MenuNav logout={this.props.logout} />
        </nav>
        <div className = "main-container">
          <h2>Menu For Today</h2>
          <div className="l-menus">
            <div className = "main-bar">
              {this.props.isMenu ? this.menuCards() : this.noMenu()}
            </div>
            {this.props.placedOrders.length ? 
            (<div className = "drawer-layout">
              {/* <div  className="order-cart"> <i className="fa fa-cart-plus order-cart-btn"></i></div> */}
              <div className={this.state.isToggled?"sidebar-container is-up" :"sidebar-container is-down"}>
                <div onClick={this.toggle} className='order-header'>
                  <h1><span className='meal-notific'>{this.props.placedOrders.length}</span> {this.props.placedOrders.length >1 ? 'meals' : 'meal'} selected</h1>
                  <i className={!this.state.isToggled ? 'fa fa-chevron-up': 'fa fa-chevron-down'}></i>
                </div>
                <div className="rect-title">
                  <h1>My Orders</h1>
                  <div className="rect"></div>
                </div>
                <div className="orders-budg">
                  <div className="cus-orders">
                    {this.props.placedOrders.length ? this.orderCard() : this.noOrder()}
                  </div>
                  <div className="order-charge">
                    <div className="myOrders border-text">
                      <h4>Orders</h4>
                      <h4>{this.props.placedOrders.length}</h4>
                    </div>
                    <div className="mySubtotal border-text">
                      <h4>Sub-total</h4>
                      <h4>&#8358;{this.subTotal()}</h4>
                    </div>
                    <div className="vat border-text">
                      <h4>VAT (5%)</h4>
                      <h4>&#8358;{this.vat()}</h4>
                    </div>
                    <div className="total-orders border-text">
                      <h4>Total</h4>
                      <h4>&#8358;{this.subTotal() - this.vat()}</h4>
                    </div>
                  </div>
                  <div className="cat">
                    <button className='clear-cart' onClick={this.deleteMeal}>Clear Cart</button>
                    <button onClick={this.submit}>Check out</button>
                  </div>
                </div>
                {/* u dont invoke it, you allow react do that. this.submit arrow function automatically binds */}
              </div>
            </div>) : ''
            }
          </div>
        </div>
        <div id="myModal" className="modal">
        {
          this.props.isOpened ? <FoodModal addMealToOrder={this.addMealToOrder} isOpened={this.props.isOpened} menus={this.props.menus} overlayId={this.props.overlayId} isOverlayOpened={this.props.isOverlayOpened} /> :
          ''
        }
        </div>
        <Footer />
      </div>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
const mapStateToProps = ({ user, menuForToday, order, isOverlayOpened }) => ({
  isAuthenticated: user.isAuthenticated,
  role: user.user.role,
  menus: menuForToday.menus,
  isMenu: menuForToday.success,
  placedOrders: order.orders,
  isOpened: isOverlayOpened.open,
  overlayId: isOverlayOpened.id,
  isOrdering: order.loading,
  isOrderError: order.isError,
  orderError: order.error,
  orderSuccessful: order.success,
});

export default connect(mapStateToProps, { logout, menuForToday, addMealToOrder, removeOrder, increaseQuantity, requestForOrder, isOverlayOpened, clearOrder, successState, errState })(HomePage);
