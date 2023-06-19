import * as cheerio from "cheerio";

const getSalaryCap = async () => {
  const response = await fetch(
    "https://www.basketball-reference.com/contracts/salary-cap-history.html"
  );
  const html = await response.text();
  const $ = cheerio.load(html);
  const allRows = $(".sortable");
  const salary = [];
  allRows.each((index, element) => {
    const tds = $(element).find("td");
  });

  return "";
};

export default getSalaryCap;
