// Modal açma/kapatma ve konuşmacıları dinamik ekleme örneği
const speakers = [
  // örnek veri, senin verdiğin konuşmacılarla değiştir
  { name: 'Ayşe Örnek', title: 'CTO, Örnek Şirket', photo: 'assets/speaker1.svg', bio: 'Bulut mühendisliği ve ölçeklenebilir sistemler üzerine konuşmacı.' },
  { name: 'Mehmet Örnek', title: 'Kurucu, Başka Şirket', photo: 'assets/speaker2.svg', bio: 'Startup hikâyeleri ve büyüme stratejileri.' }
];

function renderSpeakers(){
  const grid = document.getElementById('speakers-grid');
  if(!grid) return;
  speakers.forEach(s=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `\n      <img src="${s.photo}" alt="${s.name}" />\n      <h3>${s.name}</h3>\n      <p>${s.title}</p>\n      <button class="btn modal-open" data-name="${s.name}" data-bio="${s.bio}">Özgeçmiş</button>\n    `;
    grid.appendChild(card);
  });
}

document.addEventListener('click', function(e){
  const openBtn = e.target.closest('.modal-open');
  if(openBtn){
    const name = openBtn.dataset.name || 'Konuşmacı';
    const bio = openBtn.dataset.bio || 'Özgeçmiş yok.';
    openModal(name, bio);
  }
  if(e.target.id === 'modal-close' || e.target.classList.contains('modal')){
    closeModal();
  }
});
function openModal(title, body){
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden','false');
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').textContent = body;
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') closeModal();
});

window.addEventListener('DOMContentLoaded', renderSpeakers);
