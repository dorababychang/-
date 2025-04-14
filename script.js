const form = document.getElementById('diary-form');
const mood = document.getElementById('mood');
const entry = document.getElementById('entry');
const diaryList = document.getElementById('diary-list');

// 載入舊資料
window.onload = function () {
  const savedEntries = JSON.parse(localStorage.getItem('meowDiary')) || [];
  savedEntries.forEach((item, index) => addEntryToList(item, index));
};

// 表單送出
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newEntry = {
    date,
    time,
    mood: mood.value,
    text: entry.value
  };

  const oldEntries = JSON.parse(localStorage.getItem('meowDiary')) || [];
  oldEntries.push(newEntry);
  localStorage.setItem('meowDiary', JSON.stringify(oldEntries));

  addEntryToList(newEntry, oldEntries.length - 1);
  entry.value = '';
});

// 加一筆到畫面
function addEntryToList(entry, index) {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${entry.date} ${entry.time}</strong> ${entry.mood}：${entry.text}
  <button class="delete-btn" data-index="${index}">刪除</button>`;
  diaryList.appendChild(li);
}

// 刪除功能
diaryList.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-btn')) {
    const index = parseInt(e.target.dataset.index);
    let entries = JSON.parse(localStorage.getItem('meowDiary')) || [];
    entries.splice(index, 1);
    localStorage.setItem('meowDiary', JSON.stringify(entries));

    diaryList.innerHTML = '';
    entries.forEach((item, i) => addEntryToList(item, i));
  }
});