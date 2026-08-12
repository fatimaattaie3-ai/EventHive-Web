const events = [
  {
    id: 1,
    title: "Overcoming Exam Anxiety",
    category: "Workshop",
    price: 49,
    date: "2026-10-09T18:00",
    image: "Overcoming exam anxiety.png"
  },
  {
    id: 2,
    title: "Theatre Performances",
    category: "Audition",
    price: 85,
    date: "2026-11-01T20:00",
    image: "Audition performance.jpeg"
  },
  {
    id: 3,
    title: "Reading Session: The Great Gatsby",
    category: "Webinar",
    price: 0,
    date: "2026-11-05T10:00",
    image: "UG Reading Session (3).jpeg"
  }
];

document.addEventListener("DOMContentLoaded", function () {
  renderEvents(events);
  setInterval(updateCountdowns, 1000);

  const searchInput = document.getElementById("search-input");
  const filterCategory = document.getElementById("filter-category");
  const filterPrice = document.getElementById("filter-price");
  const themeToggle = document.getElementById("theme-toggle");

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (filterCategory) filterCategory.addEventListener("change", applyFilters);
  if (filterPrice) filterPrice.addEventListener("change", applyFilters);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("light-theme");
      const icon = document.querySelector("#theme-toggle i");
      if (icon) {
        if (document.body.classList.contains("light-theme")) {
          icon.className = "fa-solid fa-moon";
        } else {
          icon.className = "fa-solid fa-sun";
        }
      }
    });
  }
});

function renderEvents(data) {
  const container = document.getElementById("events-container");
  if (!container) return;

  container.innerHTML = "";

  if (data.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.style.gridColumn = "1/-1";
    emptyMsg.style.textAlign = "center";
    emptyMsg.style.color = "var(--text-sub)";
    emptyMsg.textContent = "No events found.";
    container.appendChild(emptyMsg);
    return;
  }

  data.forEach(function (item) {
    const card = document.createElement("div");
    card.className = "event-card";

    const img = document.createElement("img");
    img.src = item.image;
    img.className = "card-img";
    img.alt = item.title;

    const body = document.createElement("div");
    body.className = "card-body";

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = item.category;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const timer = document.createElement("div");
    timer.className = "countdown";
    timer.id = "timer-" + item.id;
    timer.textContent = "Calculating...";

    const footer = document.createElement("div");
    footer.className = "card-footer";

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = item.price === 0 ? "Free" : "$" + item.price;

    const button = document.createElement("button");
    button.className = "btn-primary";
    button.textContent = "Book Ticket";
    button.onclick = function () {
      bookTicket(item.title);
    };

    footer.appendChild(price);
    footer.appendChild(button);

    body.appendChild(badge);
    body.appendChild(title);
    body.appendChild(timer);
    body.appendChild(footer);

    card.appendChild(img);
    card.appendChild(body);

    container.appendChild(card);
  });
}

function updateCountdowns() {
  events.forEach(function (item) {
    const el = document.getElementById("timer-" + item.id);
    if (!el) return;

    const diff = new Date(item.date) - new Date();
    if (diff <= 0) {
      el.textContent = "Event Started!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    el.textContent = "⏳ Starts in: " + days + "d " + hours + "h " + mins + "m";
  });
}

function bookTicket(title) {
  const titleEl = document.getElementById("ticket-event-title");
  const idEl = document.getElementById("ticket-id");
  const modalEl = document.getElementById("ticket-modal");

  if (titleEl) titleEl.textContent = title;
  if (idEl) idEl.textContent = "#EV-" + Math.floor(1000 + Math.random() * 9000);
  if (modalEl) modalEl.style.display = "grid";
}

function closeModal() {
  const modalEl = document.getElementById("ticket-modal");
  if (modalEl) modalEl.style.display = "none";
}

function applyFilters() {
  const searchInput = document.getElementById("search-input");
  const filterCategory = document.getElementById("filter-category");
  const filterPrice = document.getElementById("filter-price");

  const searchVal = searchInput ? searchInput.value.toLowerCase() : "";
  const catVal = filterCategory ? filterCategory.value : "all";
  const priceVal = filterPrice ? filterPrice.value : "all";

  const filtered = events.filter(function (e) {
    const matchesSearch = e.title.toLowerCase().includes(searchVal);
    const matchesCat = catVal === "all" || e.category === catVal;
    const matchesPrice =
      priceVal === "all" ||
      (priceVal === "free" && e.price === 0) ||
      (priceVal === "paid" && e.price > 0);

    return matchesSearch && matchesCat && matchesPrice;
  });

  renderEvents(filtered);
}

if(state.view === "discover") app.innerHTML = renderDiscover();
else if(state.view === "detail") app.innerHTML = renderDetail();
else if(state.view === "dashboard") app.innerHTML = renderDashboard();
else if(state.view === "about") app.innerHTML = renderAbout();
else if(state.view === "contact") app.innerHTML = renderContact();