const tabs = document.querySelectorAll("[data-view]");
const panels = document.querySelectorAll(".view-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.view;

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.viewPanel === target;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  });
});

const onsiteState = {
  available: 42,
  currentSlot: "B-214",
  currentTime: "01 h 40",
  amount: 4.8,
  exitHour: 17,
  entered: false,
  paid: false,
};

const onsiteElements = {
  availability: document.querySelector("[data-onsite-availability]"),
  gate: document.querySelector("[data-onsite-gate]"),
  light: document.querySelector("[data-onsite-light]"),
  signal: document.querySelector("[data-onsite-signal]"),
  status: document.querySelector("[data-onsite-status]"),
  sessionLabel: document.querySelector("[data-onsite-session-label]"),
  slot: document.querySelector("[data-onsite-slot]"),
  time: document.querySelector("[data-onsite-time]"),
  amount: document.querySelector("[data-onsite-amount]"),
  exit: document.querySelector("[data-onsite-exit]"),
  paymentStatus: document.querySelector("[data-onsite-payment-status]"),
};

const formatEuro = (value) => `${value.toFixed(2).replace(".", ",")} €`;
const formatHour = (hour) => `${String(hour).padStart(2, "0")}:00`;

function renderOnsite() {
  onsiteElements.availability.textContent = `${onsiteState.available} places libres`;
  onsiteElements.slot.textContent = onsiteState.currentSlot;
  onsiteElements.time.textContent = onsiteState.currentTime;
  onsiteElements.amount.textContent = formatEuro(onsiteState.amount);
  onsiteElements.exit.textContent = formatHour(onsiteState.exitHour);
  onsiteElements.gate.classList.toggle("is-open", onsiteState.entered);
  onsiteElements.light.classList.toggle("green", !onsiteState.entered);
  onsiteElements.light.classList.toggle("orange", onsiteState.entered);

  if (onsiteState.entered) {
    onsiteElements.signal.textContent = "Véhicule autorisé";
    onsiteElements.status.textContent =
      "La barrière s'ouvre et une nouvelle session de stationnement démarre.";
  } else {
    onsiteElements.signal.textContent = "Entrée Quai Nord";
    onsiteElements.status.textContent =
      "Barrière prête. Clique pour simuler l'arrivée d'un véhicule.";
  }

  onsiteElements.paymentStatus.classList.toggle("is-paid", onsiteState.paid);
  onsiteElements.sessionLabel.textContent = onsiteState.paid
    ? "Paiement validé"
    : "Place attribuée";
  onsiteElements.paymentStatus.textContent = onsiteState.paid
    ? "Paiement effectué. La sortie automatique est désormais autorisée."
    : "Session en cours. Paiement et prolongation disponibles.";
}

document.querySelector("[data-onsite-enter]")?.addEventListener("click", () => {
  onsiteState.entered = true;
  onsiteState.paid = false;
  onsiteState.available = 41;
  onsiteState.currentSlot = "A-203";
  onsiteState.currentTime = "00 h 08";
  onsiteState.amount = 1.2;
  onsiteState.exitHour = 16;
  renderOnsite();
});

document.querySelector("[data-onsite-extend]")?.addEventListener("click", () => {
  onsiteState.amount += 1.5;
  onsiteState.exitHour += 1;
  onsiteState.currentTime = "02 h 10";
  onsiteState.paid = false;
  renderOnsite();
  onsiteElements.paymentStatus.classList.remove("is-paid");
  onsiteElements.paymentStatus.textContent =
    "Session prolongée de 30 minutes. Le montant a été mis à jour.";
});

document.querySelector("[data-onsite-pay]")?.addEventListener("click", () => {
  onsiteState.paid = true;
  renderOnsite();
});

document.querySelector("[data-onsite-reset]")?.addEventListener("click", () => {
  onsiteState.available = 42;
  onsiteState.currentSlot = "B-214";
  onsiteState.currentTime = "01 h 40";
  onsiteState.amount = 4.8;
  onsiteState.exitHour = 17;
  onsiteState.entered = false;
  onsiteState.paid = false;
  renderOnsite();
});

const reservationElements = {
  name: document.querySelector("[data-online-name]"),
  place: document.querySelector("[data-online-place]"),
  payment: document.querySelector("[data-online-payment]"),
  time: document.querySelector("[data-online-time]"),
  note: document.querySelector("[data-online-note]"),
  price: document.querySelector("[data-online-price]"),
  progress: document.querySelector("[data-online-progress]"),
  label: document.querySelector("[data-online-state-label]"),
  badge: document.querySelector("[data-online-state-badge]"),
  filterStatus: document.querySelector("[data-online-filter-status]"),
};

const parkingOptions = document.querySelectorAll("[data-parking-option]");
let evFilterEnabled = false;

function selectParking(option) {
  parkingOptions.forEach((item) => {
    item.classList.toggle("is-selected", item === option);
  });

  reservationElements.name.textContent = `${option.dataset.name.replace("PARKS ", "")}`;
  reservationElements.place.textContent = option.dataset.place;
  reservationElements.payment.textContent = option.dataset.payment;
  reservationElements.time.textContent = option.dataset.time;
  reservationElements.note.textContent = option.dataset.note;
  reservationElements.price.textContent = option.dataset.price;
  reservationElements.progress.style.width = `${option.dataset.progress}%`;
  reservationElements.label.textContent = "Prévisualisation";
  reservationElements.badge.textContent = "Option choisie";
}

parkingOptions.forEach((option) => {
  option.addEventListener("click", () => selectParking(option));
});

document.querySelector("[data-online-filter]")?.addEventListener("click", () => {
  evFilterEnabled = !evFilterEnabled;

  parkingOptions.forEach((option) => {
    const hasEv = option.textContent.includes("EV");
    option.classList.toggle("is-dimmed", evFilterEnabled && !hasEv);
  });

  reservationElements.filterStatus.textContent = evFilterEnabled
    ? "Filtre EV actif. Les parkings sans borne restent visibles mais sont atténués."
    : "Toutes les options sont visibles. Active un filtre pour simuler un affinage.";
});

document.querySelector("[data-online-book]")?.addEventListener("click", () => {
  reservationElements.label.textContent = "Réservation confirmée";
  reservationElements.badge.textContent = "QR prêt";
  reservationElements.note.textContent =
    "Réservation verrouillée. Un QR d'accès et un rappel d'arrivée ont été générés.";
});

const adminModes = {
  live: {
    badge: "Live",
    occupancy: "81%",
    occupancyNote: "+6% vs hier",
    bookings: "324",
    bookingsNote: "42 en attente d'arrivée",
    revenue: "8 420 €",
    revenueNote: "Paiements validés à 98,7%",
    alerts: "6 alertes",
    bars: ["88%", "73%", "91%"],
    activities: [
      ["Capteur P2-118 indisponible", "Signal perdu depuis 4 min · priorité moyenne"],
      ["Tarif soirée activé", "Applicable sur 3 parkings jusqu'à 23:59"],
      ["Demande de remboursement", "Réservation #A-2041 à traiter avant 18:00"],
    ],
  },
  rush: {
    badge: "Heure de pointe",
    occupancy: "94%",
    occupancyNote: "+14% vs moyenne",
    bookings: "418",
    bookingsNote: "88 véhicules attendus dans 30 min",
    revenue: "11 270 €",
    revenueNote: "Pic de paiements entre 17:30 et 19:00",
    alerts: "11 alertes",
    bars: ["97%", "89%", "95%"],
    activities: [
      ["Entrées en forte hausse", "Ouverture du niveau supplémentaire recommandée"],
      ["File d'attente à République", "Temps d'accès estimé à 6 minutes"],
      ["Renfort terrain demandé", "1 agent supplémentaire affecté au site Opéra"],
    ],
  },
  incident: {
    badge: "Incident",
    occupancy: "68%",
    occupancyNote: "-9% impact opérationnel",
    bookings: "267",
    bookingsNote: "31 arrivées redirigées automatiquement",
    revenue: "6 930 €",
    revenueNote: "Mesures de compensation en cours",
    alerts: "15 alertes",
    bars: ["54%", "79%", "71%"],
    activities: [
      ["Panne borne de sortie", "République P2 en mode assistance manuelle"],
      ["Clients reroutés", "32 réservations basculées vers Hôtel de Ville"],
      ["Ticket incident ouvert", "Intervention technique ETA 18 min"],
    ],
  },
};

const adminElements = {
  occupancy: document.querySelector("[data-admin-occupancy]"),
  occupancyNote: document.querySelector("[data-admin-occupancy-note]"),
  bookings: document.querySelector("[data-admin-bookings]"),
  bookingsNote: document.querySelector("[data-admin-bookings-note]"),
  revenue: document.querySelector("[data-admin-revenue]"),
  revenueNote: document.querySelector("[data-admin-revenue-note]"),
  badge: document.querySelector("[data-admin-badge]"),
  alerts: document.querySelector("[data-admin-alerts]"),
  bars: document.querySelectorAll("[data-admin-bar]"),
  barLabels: document.querySelectorAll("[data-admin-bar-label]"),
  activityList: document.querySelector("[data-admin-activity-list]"),
};

function renderAdmin(mode) {
  const state = adminModes[mode];

  adminElements.occupancy.textContent = state.occupancy;
  adminElements.occupancyNote.textContent = state.occupancyNote;
  adminElements.bookings.textContent = state.bookings;
  adminElements.bookingsNote.textContent = state.bookingsNote;
  adminElements.revenue.textContent = state.revenue;
  adminElements.revenueNote.textContent = state.revenueNote;
  adminElements.badge.textContent = state.badge;
  adminElements.alerts.textContent = state.alerts;

  adminElements.bars.forEach((bar, index) => {
    bar.style.width = state.bars[index];
  });

  adminElements.barLabels.forEach((label, index) => {
    label.textContent = state.bars[index];
  });

  adminElements.activityList.innerHTML = state.activities
    .map(
      ([title, description]) =>
        `<div><strong>${title}</strong><p>${description}</p></div>`
    )
    .join("");
}

document.querySelectorAll("[data-admin-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-admin-mode]").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    renderAdmin(button.dataset.adminMode);
  });
});

renderOnsite();
selectParking(parkingOptions[0]);
renderAdmin("live");
