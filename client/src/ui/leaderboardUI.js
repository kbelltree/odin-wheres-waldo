import { getLeaderboard } from '../data/data';

function createLeaderboardRow({ name, time }, index) {
  const tableRow = document.createElement('tr');

  const rankTd = document.createElement('td');
  rankTd.classList.add('rank');
  rankTd.textContent = `${index + 1}`;

  const nameTd = document.createElement('td');
  nameTd.classList.add('name');
  nameTd.textContent = name;

  const timeTd = document.createElement('td');
  timeTd.classList.add('time');
  timeTd.textContent = time;

  tableRow.append(rankTd, nameTd, timeTd);

  return tableRow;
}

function createLeaderboard(dataArr) {
  const container = document.createDocumentFragment();

  dataArr.forEach(({ name, time }, index) => {
    const row = createLeaderboardRow({ name, time }, index);

    container.appendChild(row);
  });

  return container;
}

export async function displayLeaderboard() {
  const { ok, data } = await getLeaderboard();

  if (!ok || data.length === 0) return false;

  const leaderboardBody = document.getElementById('leaderboard-content');
  if (!leaderboardBody) return false;

  const leaderboard = createLeaderboard(data);
  leaderboardBody.replaceChildren(leaderboard);

  return true;
}
