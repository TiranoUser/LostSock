// Socks array with initial data
let socks = [
  {
    id: 1,
    color: 'Blue',
    pattern: 'Striped',
    location: 'Dresser',
    isLeft: true,
  },
  {
    id: 2,
    color: 'Black',
    pattern: 'Solid',
    location: 'Laundry',
    isLeft: false,
  },
  {
    id: 3,
    color: 'White',
    pattern: 'Athletic',
    location: 'Closet',
    isLeft: true,
  },
  { id: 4, color: 'Gray', pattern: 'Dotted', location: 'Basket', isLeft: true },
];

// Get DOM elements
const searchInput = document.getElementById('searchInput');
const showLeftOnly = document.getElementById('showLeftOnly');
const colorInput = document.getElementById('colorInput');
const patternInput = document.getElementById('patternInput');
const locationInput = document.getElementById('locationInput');
const sideSelect = document.getElementById('sideSelect');
const addButton = document.getElementById('addButton');
const socksList = document.getElementById('socksList');
const totalCount = document.getElementById('totalCount');
const leftCount = document.getElementById('leftCount');
const rightCount = document.getElementById('rightCount');
const foundCount = document.getElementById('foundCount');

// Update statistics display
function updateStats() {
  totalCount.textContent = socks.length;
  leftCount.textContent = socks.filter((s) => s.isLeft).length;
  rightCount.textContent = socks.filter((s) => !s.isLeft).length;
}

// Filter socks based on search and checkbox
function filterSocks() {
  const searchTerm = searchInput.value.toLowerCase();
  const leftOnlyChecked = showLeftOnly.checked;

  return socks.filter((sock) => {
    const matchesSearch =
      sock.color.toLowerCase().includes(searchTerm) ||
      sock.pattern.toLowerCase().includes(searchTerm) ||
      sock.location.toLowerCase().includes(searchTerm);

    const matchesFilter = !leftOnlyChecked || sock.isLeft;

    return matchesSearch && matchesFilter;
  });
}

// Render socks list in the DOM
function renderSocks() {
  const filtered = filterSocks();
  foundCount.textContent = filtered.length;

  if (filtered.length === 0) {
    socksList.innerHTML = '<div class="empty-message">No socks found 😢</div>';
    return;
  }

  socksList.innerHTML = filtered
    .map(
      (sock) => `
        <div class="sock-item ${sock.isLeft ? 'left' : 'right'}">
            <div class="sock-content">
                <div class="sock-icon ${sock.isLeft ? 'left' : 'right'}">
                    ${sock.isLeft ? '👈' : '👉'}
                </div>
                <div class="sock-info">
                    <div class="sock-title">${sock.color} - ${
        sock.pattern
      }</div>
                    <div class="sock-location">📍 ${sock.location}</div>
                    <div class="sock-side">🧦 ${
                      sock.isLeft ? 'Left' : 'Right'
                    }</div>
                </div>
            </div>
            <button class="btn-delete" onclick="deleteSock(${sock.id})">
                🗑️
            </button>
        </div>
    `
    )
    .join('');
}

// Add a new sock to the collection
function addSock() {
  const color = colorInput.value.trim();
  const pattern = patternInput.value.trim();
  const location = locationInput.value.trim();
  const isLeft = sideSelect.value === 'true';

  // Validate input fields
  if (!color || !pattern || !location) {
    alert('Please fill in all fields!');
    return;
  }

  // Create new sock object
  const newSock = {
    id: Date.now(),
    color: color,
    pattern: pattern,
    location: location,
    isLeft: isLeft,
  };

  socks.push(newSock);

  // Clear input fields
  colorInput.value = '';
  patternInput.value = '';
  locationInput.value = '';
  sideSelect.value = 'true';

  updateStats();
  renderSocks();
}

// Delete a sock from the collection
function deleteSock(id) {
  socks = socks.filter((sock) => sock.id !== id);
  updateStats();
  renderSocks();
}

// Event listeners
addButton.addEventListener('click', addSock);
searchInput.addEventListener('input', renderSocks);
showLeftOnly.addEventListener('change', renderSocks);

// Add sock on Enter key press
[colorInput, patternInput, locationInput].forEach((input) => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addSock();
    }
  });
});

// Initialize app
updateStats();
renderSocks();
