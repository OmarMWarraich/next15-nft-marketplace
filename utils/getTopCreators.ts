export const getCreators = (array: Array<any>) => {
  const finalized: Array<any> = [];

  const result = array.reduce((res, currentValue) => {
    (res[currentValue.seller] = res[currentValue.seller] || []).push(
      currentValue
    );

    return res;
  }, {});

  Object.entries(
    result as Record<string, { price: number | string; seller: string }[]>
  ).forEach(([seller, items]) => {
    const sumall = items
      .map((item) => Number(item.price))
      .reduce((prev: number, curr: number) => prev + curr, 0);

    finalized.push({ seller, sumall });
  });

  return finalized;
};
