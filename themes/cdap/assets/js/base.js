/*
 * Copyright © 2019 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

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
