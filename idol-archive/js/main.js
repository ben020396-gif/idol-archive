// IDOL ARCHIVE - Main JavaScript

// 手機版導覽列
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

// 載入 JSON 資料
async function loadData(file) {
  try {
    const response = await fetch(`data/${file}`);

    if (!response.ok) {
      throw new Error("資料讀取失敗");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}


// 顯示團體
async function showGroups() {
  const groups = await loadData("groups.json");
  const container = document.getElementById("groupList");

  if (!groups.length) {
    container.innerHTML = "<p>目前沒有團體資料。</p>";
    return;
  }

  container.innerHTML = groups.map(group => `
    <article class="group-card">
      <div class="group-art">
        <img src="${group.image}" alt="${group.name}" class="group-photo">
      </div>
      <div class="group-info">
        <h3>${group.name}</h3>
        <p>${group.company} · ${group.debut} 出道</p>
        <p>${group.description}</p>
      </div>
    </article>
  `).join("");
}



// 顯示成員
async function showMembers() {
  const members = await loadData("members.json");
  const container = document.getElementById("memberList");

  if (!members.length) {
    container.innerHTML = "<p>目前沒有成員資料。</p>";
    return;
  }

  container.innerHTML = members.map(member => `
    <article class="member-card">
      <div class="member-avatar">
        <img src="${member.image}" alt="${member.name}" class="member-photo">
      </div>
      <h3>${member.name}</h3>
      <p>${member.koreanName}</p>
      <p>${member.groupId.toUpperCase()}</p>
    </article>
  `).join("");
}


// 顯示音樂
async function showMusic() {
  const music = await loadData("music.json");
  const container = document.getElementById("musicList");

  if (!music.length) {
    container.innerHTML = "<p>目前沒有音樂資料。</p>";
    return;
  }

  container.innerHTML = music.map(song => `
    <article class="music-item">
      <img
        src="${song.image}"
        alt="${song.album} 專輯封面"
        class="music-cover"
      >
      <div class="music-info">
        <h3>${song.title}</h3>
        <p>${song.group} · ${song.album}</p>
        <a href="${song.mvUrl}" target="_blank" rel="noopener noreferrer" class="mv-link">
          觀看 MV ↗
        </a>
      </div>
      <span class="music-date">${song.releaseDate}</span>
    </article>
  `).join("");
}



// 顯示舞台
async function showStages() {
  const stages = await loadData("stages.json");
  const container = document.getElementById("stageList");

  if (!stages.length) {
    container.innerHTML = "<p>目前沒有舞台紀錄。</p>";
    return;
  }

  container.innerHTML = stages.map(stage => `
    <article class="stage-card">
      <p>${stage.date}</p>
      <h3>${stage.title}</h3>
      <p>${stage.group} · ${stage.program}</p>
      ${stage.url ? `
        <a class="stage-link"
           href="${stage.url}"
           target="_blank"
           rel="noopener noreferrer">觀看相關影片 ↗</a>
      ` : ""}
    </article>
  `).join("");
}

// 初始化網站
async function initWebsite() {
  await Promise.all([
    showGroups(),
    showMembers(),
    showMusic(),
    showStages()
  ]);
}

initWebsite();