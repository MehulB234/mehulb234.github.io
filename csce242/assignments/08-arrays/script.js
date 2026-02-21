const happySongs = {
  "Happy by Pharrell Williams": "y6Sxv-sUYtM",
  "Don't Stop Me Now by Queen": "HgzGwKwLmgM",
  "Can't Stop the Feeling by Justin Timberlake": "ru0K8uYEZWw",
  "Don't Worry Be Happy by Bobby McFerrin": "d-diB65scQU",
  "I'm Walking on Sunshine by Katrina & the Waves": "iPUmE-tne5U"
};

const sadSongs = {
  "Hurt by Johnny Cash": "8AHCfZTRGiI",
  "Someone You Loved by Lewis Capaldi": "Z0GFRcFm-aY",
  "Someone Like You by Adele": "hLQl3WQQoQ0",
  "Fix You by Coldplay": "k4V3Mo61fJM",
  "Happier Than Ever by Billie Eilish": "5GJWxDKyk3A"
};

const moodSelect = document.getElementById("moodSelect");
const songList = document.getElementById("songList");
const videoContainer = document.getElementById("videoContainer");
const videoFrame = document.getElementById("videoFrame");

moodSelect.addEventListener("change", () => {
  songList.innerHTML = "";
  videoContainer.classList.add("hidden");
  videoFrame.src = "";

  let selectedMood = moodSelect.value;
  let songs;

  if (selectedMood === "Happy") {
    songs = happySongs;
  } else if (selectedMood === "Sad") {
    songs = sadSongs;
  } else {
    return;
  }

  for (let title in songs) {
    let link = document.createElement("a");
    link.textContent = title;
    link.href = "#";

    link.addEventListener("click", (e) => {
      e.preventDefault();
      let videoId = songs[title];
      videoFrame.src = "https://www.youtube.com/embed/" + videoId;
      videoContainer.classList.remove("hidden");
    });

    songList.appendChild(link);
  }
});