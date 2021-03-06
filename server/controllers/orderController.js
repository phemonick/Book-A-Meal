import { Order, User, Meal, OrderMeal } from '../models';
import { checkPagination, paginatedData } from '../helpers/paginate';

/**
 * @class
 */
class OrderController {
  /**
   * @description creates a user order
   * @method createOrder
   * @param {string} req
   * @param {object} res
   * @returns {object} - response to be sent to the client
   */
  static async createOrder(req, res) {
    const { order } = req.body;
    const userId = req.user.id;
    // array of mealId
    const mealIdArray = order.meals.map(meal => meal.mealId);
    try {
      // finds array of mealId, returns id and price
      const mealInfo = await Meal.findAll({
        where: { id: mealIdArray },
        attributes: ['id', 'price'],
      });
      if (mealInfo.length) {
        const createdOrder = await Order.create({
          userId,
          address: order.address,
        });
        const allOrders = order.meals.map((newOrder, index) => ({
          mealId: newOrder.mealId,
          quantity: newOrder.quantity,
          orderId: createdOrder.id,
          cost: mealInfo[index].price * newOrder.quantity,
        }));
        const allMeals = await OrderMeal.bulkCreate(allOrders);
        res.status(201).send({
          success: true,
          order: allMeals,
        });
      } else {
        res.status(404).send({
          success: false,
          message: 'That meal does not exist',
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error,
      });
    }
  }

  /**
   * @description modify user order
   * @param {string} req
   * @param {object} res
   * @returns {object} res
   */
  static modifyOrder(req, res) {
    OrderMeal
      .findOne({
        where: {
          id: req.params.orderId,
        },
      }).then((order) => {
        const orderInfo = Object.assign({}, order);
        if (order.status !== 'pending') {
          return res.status(401).json({
            success: false,
            message: 'order cannot be modified',
          });
        }
        order.update({ ...orderInfo, ...req.body }).then((newOrder) => {
          res.status(200).json({
            success: true,
            order: newOrder,
          });
        }).catch(() => res.status(400).json({
          success: false,
          message: 'cannot modify order, insert a valid input',
        }));
      }).catch(() => res.status(404).json({
        success: false,
        message: 'No order exist with that Id',
      }));
  }

  /**
   * @summary method to get caterer order histories
   * @param {object} req
   * @param {object} res
   * @returns {object} res
   */
  static catererOrders(req, res) {
    const { page, limit, offset } = checkPagination(req);
    Order.findAndCountAll({
      include: [
        {
          model: Meal,
          paranoid: false,
          where: {
            userId: req.user.id,
          },
        }, User,
      ],
      limit,
      offset,
      order: [['id', 'DESC']],
    })
      .then((orders) => {
        if (orders.count === 0) {
          return res.status(404).send({
            success: false,
            message: 'Order is empty',
          });
        }
        return res.status(200).json({
          success: true,
          pagination: paginatedData(page, limit, orders),
          data: orders.rows,
        });
      }).catch(() => res.status(500).send({
        success: false,
        message: 'failed to get all orders',
      }));
  }

  /**
   * Get Order
   * @description get a particular customer order
   * @param {string} req - request
   * @param {object} res - object response
   * @returns {object} - response to be sent to client
   */
  static customerOrders(req, res) {
    const { page, limit, offset } = checkPagination(req);
    Order.findAndCountAll({
      include: [
        {
          model: Meal,
          paranoid: false,
        }, User,
      ],
      limit,
      offset,
      order: [['id', 'DESC']],
      where: {
        userId: req.user.id,
      },
    }).then((userOrders) => {
      if (userOrders.rows.length === 0) {
        return res.status(404).send({
          success: false,
          message: 'Customer order is empty',
        });
      }
      return res.status(200).send({
        success: true,
        pagination: paginatedData(page, limit, userOrders),
        orders: userOrders.rows,
      });
    }).catch((err) => {
      res.status(500).send({
        success: false,
        message: 'cannot get customer orders',
      });
    });
  }
}

export default OrderController;
