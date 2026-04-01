let lastBookedRooms = [];

async function loadRooms() {
  const res = await fetch("/api/rooms");
  const data = await res.json();
  renderGrid(data);
}

function renderGrid(data) {
  const container = document.getElementById("hotelGrid");
  container.innerHTML = "";

  data.forEach((floor, f) => {
    const row = document.createElement("div");
    row.className = "flex gap-3";

    floor.forEach((room, i) => {
      const div = document.createElement("div");

      const num =
        f === 9 ? 1000 + (i + 1) : (f + 1) * 100 + (i + 1);

      let base =
        "w-10 h-10 text-[10px] flex items-center justify-center border rounded border-zinc-600 hover:scale-105 transition";

      if (room === 1) {
        div.className = base + " bg-red-500 text-white";
      } else {
        div.className = base + " bg-zinc-700 text-zinc-200";
      }

      if (lastBookedRooms.includes(num)) {
        div.className = base + " bg-green-500 text-white";
      }

      div.innerText = num;
      row.appendChild(div);
    });

    container.appendChild(row);
  });
}

async function bookRooms() {
  const count = document.getElementById("roomCount").value;

  const res = await fetch("/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count })
  });

  const data = await res.json();

  if (!data.success) return alert(data.message);

  lastBookedRooms = data.rooms;

  document.getElementById("travelTime").innerText =
    `Travel Time: ${data.travelTime} minutes`;

  loadRooms();
}

async function resetRooms() {
  await fetch("/api/reset", { method: "POST" });
  lastBookedRooms = [];
  document.getElementById("travelTime").innerText = "";
  loadRooms();
}

async function randomRooms() {
  await fetch("/api/random", { method: "POST" });
  lastBookedRooms = [];
  document.getElementById("travelTime").innerText = "";
  loadRooms();
}

loadRooms();