const formatTrade = (trade: any) => {
  const [ID, MTS, AMOUNT, PRICE] = trade;
  return {
    ID,
    MTS,
    AMOUNT,
    PRICE
  };
};

export const formatResponseMessage = (data: any) => {
  // snapshot
  if (data.length === 2) {
    const [channelId, trades] = data;

    return {
      channelId,
      trades: trades.map(formatTrade)
    };
  }

  // update
  if (data.length === 3) {
    const [channelId, type, trade] = data;
    return {
      channelId,
      trades: [formatTrade(trade)],
      type
    };
  }

  return { channelId: data.channelId, trades: [] };
};
