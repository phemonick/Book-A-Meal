import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { TopNav, MealCard, MenuItems } from '../common/';
import InlineError from '../messages/inlineError';
import { addToMenu, fetchMeals, removeMeal, createMenu, logout, changeMErrorState, changeMSuccessState, clearMenu } from '../../actions';


class MenuPage extends Component {
  constructor(){
    super();
    this.state={
      date: '',
      isOpened: false,
    }
  }
  componentWillMount() {
    const { role } = this.props;
    if (!(role === 'admin' || role === 'super-admin')) {
      this.props.history.push('/login');
    }
    // this.props.fetchMeals;
  }
  componentDidMount() {
    this.props.fetchMeals();
  }
  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  componentDidUpdate(prevProps) {
    if(this.props.success) {
      this.alert();
      this.props.changeMSuccessState(false);
      this.openMenu();
      this.props.clearMenu();
    }
  }
  openMenu = () => (
    this.setState({
      isOpened: !this.state.isOpened
    })
  )
  noMeal = () => (
    <div className="no-meal">
      <h1>No meals Yet</h1> 
    </div>
  );
  onChange = (e) => ( 
    this.setState({
      date: { ...this.state.date, [e.target.name]: e.target.value }
    })
  )
  submit = () => {
    // console.log(this.state.date)
    this.props.createMenu(this.props.menus, this.state.date.date)
  }
  alert = () => (
    swal("Menu Created", "Your menu has been created successfully!", "success")
  )
  dateBtn = () => (
    <div className="date-btn">
      <div className="input-date">
        <h4>Menu Date</h4>
        <input name='date' onChange={this.onChange} type="date" />
      </div>
      
      <button className="create-m-btn" onClick={() => this.submit()}>Create Menu</button>
    </div>
  )
  addedMenus = (meal) => {
    if(this.props.menus.length){
      let alreadyExist = this.props.menus.some((item) => meal.id === item.id);
      console.log(this.props.menus.some((item) => meal.id == item.id))
      return (
        alreadyExist? '' : this.props.addToMenu(meal)
      )
    }else{
      console.log(meal)
      return this.props.addToMenu(meal)
    }
    
  }

  myMenus = () => this.props.menus.length ? (this.props.menus.map((menu, key) => <MenuItems removeMeal={this.props.removeMeal} menu={menu} key={key} /> )) : (this.noMeal())

  menuSlider = () =>
    (
    <div className = "drawer-layout">
      <div className={this.state.isOpened ? "sidebar-container is-up": "sidebar-container is-down"}>
        <div onClick={this.openMenu} className="order-header">
          <h1><span className="meal-notific">{this.props.menus.length}</span> {this.props.menus.length>1 ? 'Meals' : 'Meal'} Selected</h1>
          {this.state.isOpened ? <i className="fa fa-chevron-down"></i>: <i className="fa fa-chevron-up"></i>}
        </div>
        <div className="set-menu-content">
          {this.myMenus()}
          {this.props.menus.length ? this.dateBtn() : '' }
          {this.props.createdMenuError && <div className="center-text">
              <InlineError text={this.props.createdMenuError} />
            </div>}
        </div>
      </div>
    </div>
    )

  handlePageChange = ({selected}) => {
    console.log('page selected>>>>>>>>>>', selected);
    const page = selected + 1;
    localStorage.setItem('currentMenuPage', page);
    const currentPage = localStorage.getItem('currentMenuPage');
    this.props.fetchMeals(currentPage);
  }

  renderPagination = () => (
    <ReactPaginate 
      previousLabel={<i className="fa fa-chevron-left" />}
      nextLabel={<i className="fa fa-chevron-right" />}
      breakLabel={<a href="">...</a>}
      breakClassName={'break-me'}
      pageCount={this.props.pageCount}
      initialPage={this.props.page - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={this.handlePageChange}
      disableInitialCallback
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  )
 myMeals = () => this.props.fetchedMeals ? (this.props.allMeals.length ? 
    (this.props.allMeals.map((meal, key) => <MealCard addedMenus={this.addedMenus} meal={meal} key={key} /> ))
    :(this.noMeal())) : (this.noMeal());

  render() {
    return (
      <div>
        <TopNav logout={this.props.logout} />
        <div className = "main-container">
          <div className = "menupage-meals">
            {this.myMeals()}
          </div>
          {this.props.allMeals.length && this.renderPagination()}
          {this.props.menus.length>0 && this.menuSlider()}
        </div>
      </div>
    );
  }
}

MenuPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  fetchedMeals: PropTypes.bool.isRequired,
  fetchMeals: PropTypes.func.isRequired,
  addToMenu: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired,
  removeMeal: PropTypes.func.isRequired
};

const mapstatetoProps = ({ user, fetchMeals, menu }) => ({
  isAuthenticated: user.isAuthenticated,
  role: user.user.role,
  allMeals: fetchMeals.meals,
  fetchedMeals: fetchMeals.success,
  menus: menu.menus,
  isError: menu.isError,
  success: menu.success,
  createdMenuError: menu.createMenuError,
  page: fetchMeals.pagination.page,
  pageCount: fetchMeals.pagination.pageCount,
  pageSize: fetchMeals.pagination.pageSize,
  totalCount: fetchMeals.pagination.totalCount,
});
export default connect(mapstatetoProps, { addToMenu, fetchMeals, removeMeal, createMenu, logout, changeMErrorState, changeMSuccessState, clearMenu })(MenuPage);
