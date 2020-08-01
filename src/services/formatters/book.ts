const formatOrder = (order: any) => {
  const [PRICE, COUNT, AMOUNT] = order;

  return {
    PRICE,
    COUNT,
    AMOUNT
  };
};

export const formatResponseMessage = (data: any) => {
  const [channelId, response] = data;

  // snapshot
  if (Array.isArray(response[0])) {
    return {
      channelId,
      orders: response.map(formatOrder)
    };
  }

  //update
  else {
    return {
      channelId,
      orders: [formatOrder(response)]
    };
  }
};
