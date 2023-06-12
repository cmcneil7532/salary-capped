import * as cheerio from "cheerio";

const getTeamPayrollNotes = async (teamId) => {
  const response = await fetch(
    `https://www.basketball-reference.com/contracts/${teamId}.html`
  );
  const html = await response.text();
  const $ = cheerio.load(html);
  const allRows = $("#payroll-notes > tbody > tr");

  const notesData = [];
  allRows.each((index, element) => {
    const ths = $(element).find("th");
    const tds = $(element).find("td");
    const name = $(ths[0]).text();

    const notes = $(tds[1]).text();
    notesData.push({
      name: name,
      notes: notes,
    });
  });

  return notesData;
};

export default getTeamPayrollNotes;
