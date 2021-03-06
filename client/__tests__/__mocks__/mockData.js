const mockData = {
  authResponse: {
    success: true,
    message: 'user created successfully',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGUiOiJ1c2VyIiwiZmlyc3RuYW1lIjoib2x1d2FmZW1pIiwiaWF0IjoxNTM0MTE0MzQ0LCJleHAiOjE1MzU5MTQzNDR9.nrCV-E_kCU4ZNSnz8Z9fG34wSdvGTyOrBmru5DdvPF4',
  },
  loginResponse: {
    success: true,
    message: 'Welcome oluwafemi',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGUiOiJ1c2VyIiwiZmlyc3RuYW1lIjoib2x1d2FmZW1pIiwiaWF0IjoxNTM0MTE0MzQ0LCJleHAiOjE1MzU5MTQzNDR9.nrCV-E_kCU4ZNSnz8Z9fG34wSdvGTyOrBmru5DdvPF4',
  },
  invalidPassRes: {
    success: false,
    message: 'Email or password is incorrect',
  },
  notExistResponse: {
    success: true,
    message: 'User does not exist',
  },
  signUpData: {
    firstname: 'oluwafemi',
    lastname: 'adekunle',
    password: 'user123',
    email: 'phem4@gmail.ciu',
  },
  catererSignup: {
    firstname: 'oluwafemi',
    lastname: 'adekunle',
    password: 'user123',
    email: 'caterer@gmail.com',
    role: 'caterer',
  },
  signinData: {
    password: 'user123',
    email: 'phem4@gmail.ciu',
  },
  invalidSignin: {
    password: 'user12',
    email: 'phem4@gmail.ciu',
  },
  invalidUser: {
    email: 'user@user.com',
    password: 'pass123',
  },
  signupFailure: {
    message: 'User already exist',
  },
  ofadaRice: {
    name: 'ofadas',
    price: 2000,
    description: 'Users  are very much satisfied with such delicacy',
    image: 'https://medium.com/the-andela-way/a-simple',
  },
  bread: {
    name: 'bread',
    price: 'yyy',
    description: 'Users  are very much satisfied with such delicacy',
    image: 'https://medium.com/the-andela-way/a-simple',
  },
  mealData3: {
    name: '123ofadas',
    price: 2000,
    description: 'Users  are very much satisfied with such delicacy',
    image: 'https://medium.com/the-andela-way/a-simple',
  },
  mealUpdate: {
    id: 1,
    price: 17000,
  },
  mealSuccessRes: {
    success: true,
    meal: {
      id: 1,
      description: 'Users  are very much satisfied with such delicacy',
      price: 2000,
      image: 'https://medium.com/the-andela-way/a-simple',
      name: 'Ofadas',
      updatedAt: '2018-08-25T09:34:46.290Z',
      createdAt: '2018-08-25T09:34:46.290Z',
      userId: 1,
      deletedAt: null,
    },
  },
  mealExist: {
    success: false,
    message: 'Meal already exist',
  },
  inValidMealPrice: {
    success: false,
    message: 'invalid meal price',
  },
  invalidMealName: {
    success: false,
    message: 'invalid meal name',
  },
  mealUpdateSuccess: {
    header: 'Meal Updated',
    message: 'Your meal has been updated successfully!',
    type: 'success',
  },
  mealUpdate2: {
    id: 1,
    price: 'price',
  },
  invalidPriceUdate: {
    header: 'Meal Update Error',
    message: 'Error updating meal',
    type: 'error',
  },
  mealDeleted: {
    header: 'Meal Deleted',
    message: 'Your meal has been deleted successfully',
    type: 'success',
  },
  deleteMealError: {
    header: 'Meal Error',
    message: 'Error deleting meal',
    type: 'error',
  },
  userOrder: {
    orders: [
      { mealId: 1, quantity: 2 }, { mealId: 2, quantity: 3 },
    ],
  },
  userOrderSuccess: {
    success: true,
    data: [
      {
        id: 5,
        quantity: 2,
        status: 'pending',
        mealId: 1,
        userId: 1,
        createdAt: '2018-08-25T22:42:43.266Z',
        updatedAt: '2018-08-25T22:42:43.267Z',
      },
      {
        id: 6,
        quantity: 3,
        status: 'pending',
        mealId: 1,
        userId: 1,
        createdAt: '2018-08-25T22:42:43.266Z',
        updatedAt: '2018-08-25T22:42:43.267Z',
      },
    ],
  },
  userOrder2: {
    orders: [
      { mealId: 'two', quantity: 2 }, { mealId: 2, quantity: 3 },
    ],
  },
  userOrder3: {
    orders: [
      { mealId: 2, quantity: 2 }, { mealId: 2, quantity: 'four' },
    ],
  },
  userOrderError: {
    success: false,
    message: 'Meal Id and quantity must be an Integer',
  },

  fetchMealSuccess: {
    success: true,
    pagination: {
      pagination: {
        page: 1,
        pageCount: 1,
        pageSize: 2,
        totalCount: 2,
      },
    },
    data: [
      {
        id: 3,
        name: 'food',
        description: 'Users  are very much satisfied with such delicacy',
        price: 200,
        image: 'https://medium.com/the-andela-way/a-simple',
        userId: 1,
        createdAt: '2018-08-25T22:42:12.009Z',
        updatedAt: '2018-08-25T22:42:12.009Z',
      },
      {
        id: 2,
        name: 'joloofRice',
        description: 'Users  are very much satisfied with such delicacy',
        price: 2000,
        image: 'https://medium.com/the-andela-way/a-simple',
        userId: 1,
        createdAt: '2018-08-25T12:58:34.198Z',
        updatedAt: '2018-08-25T12:58:34.198Z',
      },
    ],
  },
  menuData: {
    mealId: [1, 2],
    date: '2018-06-10',
  },
  menuMeals: [{ id: 1 }, { id: 2 }],
  menuSUccess: {
    createdAt: '2018-08-25T09:34:46.290Z',
    description: 'Users  are very much satisfied with such delicacy',
    id: 1,
    image: 'https://medium.com/the-andela-way/a-simple',
    name: 'Ofadas',
    price: 2000,
    updatedAt: '2018-08-25T09:34:46.290Z',
    userId: 1,
  },
  invalidMenuInput: {
    mealId: [1, 2],
    date: '10-2018',
  },
  menuFailure: {
    message: 'invalid date input',
  },
  waleOrder: {
    order: {
      meals: [
        { mealId: 1, quantity: 4 }, { mealId: 2, quantity: 7 },
      ],
      address: 'london road andela',
    },
  },
  orderSuccess: {
    success: true,
    pagination:
       {
         pagination: {
           page: 1, pageCount: 1, pageSize: 1, totalCount: 2,
         },
       },
    orders:
       [{
         id: 3,
         address: 'london road andela',
         userId: 3,
         createdAt: '2018-09-12T10:26:30.786Z',
         updatedAt: '2018-09-12T10:26:30.786Z',
         Meals: [{
           id: 2,
           name: 'joloofRice',
           description: 'Users  are very much satisfied with such delicacy',
           price: 2000,
           image: 'https://medium.com/the-andela-way/a-simple',
           userId: 1,
           createdAt: '2018-08-25T12:58:34.198Z',
           updatedAt: '2018-08-25T12:58:34.198Z',
         }],
         User: {
           firstname: 'oluwafemi',
           lastname: 'adekunle',
           email: 'phem4@gmail.ciu',
         },
       }],
  },
  mealOrderSuccess: {
    success: true,
    order:
     [{
       id: null,
       orderId: 3,
       mealId: 211,
       status: 'pending',
       quantity: 40,
       createdAt: '2018-09-13T01:49:55.464Z',
       updatedAt: '2018-09-13T01:49:55.464Z',
     },
     {
       id: null,
       orderId: 3,
       mealId: 212,
       status: 'pending',
       quantity: 17,
       createdAt: '2018-09-13T01:49:55.464Z',
       updatedAt: '2018-09-13T01:49:55.464Z',
     }],
  },
  bisiOrder: {
    order: {
      meals: [
        { mealId: 211, quantity: 40 }, { mealId: 212, quantity: 17 },
      ],
      address: 'london road andela',
    },

  },
  orderFailure: {
    success: false,
  },

};
export default mockData;
