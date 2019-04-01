const toggleButton = $('#toggleBtn')[0];
const collapseContainer = $('#companies');

collapseContainer.on('show.bs.collapse', () => {
  toggleButton.innerText = 'Show less';
});

collapseContainer.on('hidden.bs.collapse', () => {
  toggleButton.innerText = 'Show more';
});

const menuButton = $('#menuBtn');
const closeButton = $('#closeBtn');
const mobileMenu = $('#mobileMenu');

menuButton.on('click', () => mobileMenu.show(300));
closeButton.on('click', () => mobileMenu.hide(300));

function learnMore(id) {
  const toggleButton = $(`#${id}btn`)[0];
  const collapseContainer = $(`#${id}`);

  collapseContainer.on('show.bs.collapse', () => {
    toggleButton.innerText = 'Hide';
  });

  collapseContainer.on('hidden.bs.collapse', () => {
    toggleButton.innerText = 'Learn more';
  });
}

function search() {
  const plugins = document.querySelectorAll('.plugins-small__item');
  const titles = document.querySelectorAll('.plugins-small__title');
  const searchResult = document.querySelector('.plugins-small__search-result');
  const searchInput = document.querySelector('.plugins-small__search-input');
  const searchCriteria = searchInput.value.toUpperCase().replace(/\s/g, '');
  const showPlugins = Array.from(titles).filter((title, index) => {
    const searchArea = title.textContent || title.innerText;
    if (searchArea.toUpperCase().replace(/\s/g, '').indexOf(searchCriteria) > -1){
      plugins[index].style.display = '';
      return plugins[index];
    } else {
      plugins[index].style.display = 'none';
    }
  });
  searchResult.style.display = !showPlugins.length ? '' : 'none';
}

// New feature date check

$(document).ready( () => {

  const current = new Date();
  const expiry = new Date("April 11, 2019 00:00:00");

  if (current.getTime() < expiry.getTime()) {
    $('#newFeature').remove();
  }
  $('.services').animate({
    opacity: 1
  }, 500 );

});