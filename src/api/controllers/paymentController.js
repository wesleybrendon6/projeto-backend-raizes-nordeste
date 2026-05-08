module.exports = {

  async process(req, res) {

    const { orderId, paymentMethod } = req.body;

    const approved = true;

    if (!approved) {

      return res.status(400).json({
        status: 'PAGAMENTO_RECUSADO'
      });

    }

    return res.json({
      status: 'PAGAMENTO_APROVADO',
      orderId,
      paymentMethod
    });

  }

};