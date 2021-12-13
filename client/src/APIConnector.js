var yahooFinance = require("yahoo-finance");

export const getHistoricalData = async (ticker, fromDate, toDate) => {
  await yahooFinance
    .historical({
      symbol: ticker,
      from: fromDate,
      to: toDate,
      period: "d",
    })
    .then(function (quotes) {
      if (quotes[0]) {
        console.log(`successfully retrieved ${quotes.length} results`);
        return quotes;
      } else {
        console.log("N/A");
        return undefined;
      }
    });
};

//getHistoricalData('AAPL', '2012-01-01', '2012-01-30')

// yahooFinance.historical({
//     symbol: SYMBOL,
//     from: '2012-01-01',
//     to: '2012-12-31',
//     period: 'd'
//   }).then(function (quotes) {
//     console.log(`There are ${quotes.length} results`)
//     if (quotes[0]) {
//       console.log(
//         '%s\n...\n%s',
//         JSON.stringify(quotes[0], null, 2),
//         JSON.stringify(quotes[quotes.length - 1], null, 2)
//       );
//     } else {
//       console.log('N/A');
//     }
//   });
