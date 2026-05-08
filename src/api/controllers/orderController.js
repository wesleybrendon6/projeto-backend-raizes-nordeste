const Order = require('../../domain/models/Order');

module.exports = {

  async create(req, res) {

    const { product, quantity, canalPedido } = req.body;

    const canaisValidos = ['APP', 'TOTEM', 'BALCAO', 'WEB', 'PICKUP'];

    if (!canalPedido) {
      return res.status(422).json({
        error: 'CANAL_PEDIDO_OBRIGATORIO',
        message: 'O campo canalPedido é obrigatório.',
        details: [
          {
            field: 'canalPedido',
            issue: 'Campo obrigatório não informado.'
          }
        ],
        timestamp: new Date().toISOString(),
        path: req.originalUrl
      });
    }

    if (!canaisValidos.includes(canalPedido)) {
      return res.status(422).json({
        error: 'CANAL_PEDIDO_INVALIDO',
        message: 'O canal do pedido informado é inválido.',
        details: [
          {
            field: 'canalPedido',
            issue: 'Valores aceitos: APP, TOTEM, BALCAO, WEB, PICKUP.'
          }
        ],
        timestamp: new Date().toISOString(),
        path: req.originalUrl
      });
    }

    const estoque = 10;

    if (quantity > estoque) {
      return res.status(409).json({
        error: 'ESTOQUE_INSUFICIENTE',
        message: 'Não há quantidade suficiente em estoque.',
        details: [
          {
            field: 'quantity',
            issue: `Disponível: ${estoque}`
          }
        ],
        timestamp: new Date().toISOString(),
        path: req.originalUrl
      });
    }

    const total = quantity * 25;

    const order = await Order.create({
      product,
      quantity,
      canalPedido,
      total
    });

    return res.status(201).json(order);
  },

  async list(req, res) {

    const { canalPedido } = req.query;

    const where = {};

    if (canalPedido) {
      where.canalPedido = canalPedido;
    }

    const orders = await Order.findAll({
      where
    });

    return res.json(orders);
  },

  async updateStatus(req, res) {

    const { id } = req.params;

    const { status } = req.body;

    const statusValidos = [
      'PENDENTE',
      'COZINHA',
      'PRONTO',
      'ENTREGUE',
      'CANCELADO'
    ];

    if (!statusValidos.includes(status)) {
      return res.status(422).json({
        error: 'STATUS_INVALIDO',
        message: 'Status informado inválido.',
        details: [
          {
            field: 'status',
            issue: 'Use: PENDENTE, COZINHA, PRONTO, ENTREGUE ou CANCELADO.'
          }
        ],
        timestamp: new Date().toISOString(),
        path: req.originalUrl
      });
    }

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({
        error: 'PEDIDO_NAO_ENCONTRADO',
        message: 'Pedido não encontrado.',
        details: [],
        timestamp: new Date().toISOString(),
        path: req.originalUrl
      });
    }

    order.status = status;

    await order.save();

    return res.json(order);
  }

};