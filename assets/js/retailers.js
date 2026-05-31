/* Phat Panda — Retailer Locator
   Loads retailers.json, renders list + Leaflet map, supports search and region filter.
*/
(function(){
  'use strict';

  const REGIONS = {
    'Seattle': ['Seattle','Bellevue','Renton','Burien','Tukwila','Shoreline','Kirkland','Redmond','Lynnwood','Bothell','Issaquah','Mercer Island','Edmonds','Everett','Federal Way','Kent','Auburn','SeaTac'],
    'Vancouver': ['Vancouver','Camas','Battle Ground','Ridgefield','Washougal','Longview','Kelso'],
    'Tri': ['Kennewick','Pasco','Richland','West Richland','Benton City'],
    'Spokane': ['Spokane','Spokane Valley','Cheney','Pullman','Liberty Lake','Airway Heights','Deer Park','Colville','Walla Walla','Yakima','Wenatchee','Ellensburg','Moses Lake'],
    'Tacoma': ['Tacoma','Lakewood','University Place','Puyallup','Gig Harbor','Olympia','Lacey','Tumwater','Bremerton','Port Orchard','Silverdale','Aberdeen','Hoquiam','Centralia','Chehalis','Shelton']
  };

  function regionFor(city){
    for (const [k, list] of Object.entries(REGIONS)) {
      if (list.some(c => city.toLowerCase().includes(c.toLowerCase()))) return k;
    }
    return 'Other';
  }

  let RETAILERS = [];
  let activeRegion = 'all';
  let query = '';
  let activeId = null;
  let map, markerLayer;
  const markers = new Map();

  function init(){
    if (typeof L === 'undefined') {
      // Leaflet not loaded yet, retry
      setTimeout(init, 200);
      return;
    }
    map = L.map('map', { zoomControl: true, scrollWheelZoom: true })
      .setView([47.5, -120.5], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }).addTo(map);
    markerLayer = L.layerGroup().addTo(map);

    fetch('/assets/data/retailers.json')
      .then(r => r.json())
      .then(data => {
        RETAILERS = data.map((r, i) => ({...r, id: i, region: regionFor(r.city)}));
        render();
        addMarkers();
      })
      .catch(err => {
        document.getElementById('results').innerHTML =
          '<div class="locator-empty">Couldn\'t load retailers. Try refreshing the page.</div>';
      });

    document.getElementById('search').addEventListener('input', e => {
      query = e.target.value.trim().toLowerCase();
      render();
    });
    document.querySelectorAll('#region-filters button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#region-filters button').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        activeRegion = btn.dataset.region;
        render(true);
      });
    });
  }

  function filtered(){
    return RETAILERS.filter(r => {
      if (activeRegion !== 'all' && r.region !== activeRegion) return false;
      if (!query) return true;
      const hay = `${r.name} ${r.city} ${r.zip} ${r.address}`.toLowerCase();
      return hay.includes(query);
    });
  }

  function render(zoomToRegion){
    const list = filtered();
    const root = document.getElementById('results');
    document.getElementById('count').textContent = list.length;

    if (list.length === 0) {
      root.innerHTML = '<div class="locator-empty">No retailers match your search. Try a different city or zip.</div>';
      return;
    }

    root.innerHTML = list.map(r => `
      <div class="locator-card${r.id === activeId ? ' is-active' : ''}" data-id="${r.id}">
        <h3 class="locator-card-name">${escapeHtml(r.name)}</h3>
        <p class="locator-card-addr">${escapeHtml(r.address)}<br>${escapeHtml(r.city)}, ${r.state} ${r.zip}</p>
        <div class="locator-card-meta">
          ${r.phone ? `<a href="tel:${r.phone.replace(/[^0-9+]/g,'')}">${escapeHtml(r.phone)}</a>` : ''}
          ${r.website ? `<a href="${r.website}" target="_blank" rel="noopener">Website ↗</a>` : ''}
        </div>
      </div>
    `).join('');

    root.querySelectorAll('.locator-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = +card.dataset.id;
        focusRetailer(id);
      });
    });

    // Zoom map to filtered set
    if (markerLayer && list.length) {
      const bounds = L.latLngBounds(list.filter(r => r.lat && r.lng).map(r => [r.lat, r.lng]));
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
      }
    }
  }

  function addMarkers(){
    markerLayer.clearLayers();
    markers.clear();
    RETAILERS.forEach(r => {
      if (!r.lat || !r.lng) return;
      const icon = L.divIcon({
        className: '',
        html: '<div class="pp-marker">PP</div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      const m = L.marker([r.lat, r.lng], { icon }).addTo(markerLayer);
      m.bindPopup(popupHtml(r));
      m.on('click', () => focusRetailer(r.id, true));
      markers.set(r.id, m);
    });
  }

  function popupHtml(r){
    return `
      <h4 class="popup-name">${escapeHtml(r.name)}</h4>
      <p class="popup-addr">${escapeHtml(r.address)}<br>${escapeHtml(r.city)}, ${r.state} ${r.zip}</p>
      ${r.phone ? `<div class="popup-row">📞 <a href="tel:${r.phone.replace(/[^0-9+]/g,'')}">${escapeHtml(r.phone)}</a></div>` : ''}
      ${r.hours ? `<div class="popup-row">🕐 ${escapeHtml(r.hours)}</div>` : ''}
      ${r.website ? `<div class="popup-row"><a href="${r.website}" target="_blank" rel="noopener">Website ↗</a></div>` : ''}
      <a class="popup-directions" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}">Get directions →</a>
    `;
  }

  function focusRetailer(id, fromMarker){
    activeId = id;
    const r = RETAILERS.find(x => x.id === id);
    if (!r) return;

    // Update list highlight
    document.querySelectorAll('.locator-card').forEach(c => {
      c.classList.toggle('is-active', +c.dataset.id === id);
      if (+c.dataset.id === id) c.scrollIntoView({behavior:'smooth', block:'nearest'});
    });

    // Fly map + open popup
    if (r.lat && r.lng) {
      if (!fromMarker) {
        map.flyTo([r.lat, r.lng], 14, { duration: 0.6 });
        const m = markers.get(id);
        if (m) setTimeout(() => m.openPopup(), 700);
      }
    }
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
