import * as cheerio from "cheerio";

const getTeamPayrollNotes = async (teamId) => {
  const response = await fetch(
    `https://www.basketball-reference.com/contracts/${teamId}.html`
  );
  const html = await response.text();
  const $ = cheerio.load(html);
  const allRows = $("#payroll-notes > tbody > tr");
  console.log(allRows);
  const notesData = [];
  allRows.each((index, element) => {
    const ths = $(element).find("th");
    const tds = $(element).find("td");
    const name = $(ths[0]).text();
    console.log(name);
    const notes = $(tds[1]).text();
    notesData.push({
      name: name,
      notes: notes
    });
  });
  console.log("result", notesData);
  return notesData;

};

export default getTeamPayrollNotes;
