'use strict';

const $ = (element) => document.querySelector(element);

function App() {
 const menuSubmitButton = $('#espresso-menu-submit-button');
 const espressoMenuName = $('#espresso-menu-name');
 const espressoMenuList = $('.espresso-menu-list');

 const updateMenuCount = () => {
  const menuCount = espressoMenuList.querySelectorAll('li').length;
  $('.menu-count').innerText = `총 ${menuCount}개`;
 };
 const addMenuName = () => {
  const menuName = espressoMenuName.value;
  if (!menuName) {
   alert('메뉴를 입력하지 않으셨습니다.');
   return;
  }
  const template = `
    <li class="menu-list-item">
       <span class="menu-name">${menuName}</span>
       <button type="button" class="menu-soldout-btn">품절</button>
       <button type="button" class="menu-edit-btn">수정</button>
       <button type="button" class="menu-remove-btn">삭제</button>
    </li>
  `;
  espressoMenuList.insertAdjacentHTML('beforeend', template);
  espressoMenuName.value = '';
  updateMenuCount();
 };

 espressoMenuName.addEventListener('keypress', (e) => {
  if (e.key !== 'Enter') {
   return;
  }
  e.preventDefault();
  addMenuName();
 });

 menuSubmitButton.addEventListener('click', () => {
  addMenuName();
 });

 espressoMenuList.addEventListener('click', (e) => {
  if (e.target.classList.contains('menu-edit-btn')) {
   const $menuName = e.target.closest('li').querySelector('.menu-name');
   const menuName = $menuName.innerText;
   const updatedMenuName = prompt('메뉴명을 수정하세요', menuName);
   $menuName.innerText = updatedMenuName;
  }
  if (e.target.classList.contains('menu-remove-btn')) {
   if (confirm('정말 삭제하시겠습니까?')) {
    e.target.closest('li').remove();
    updateMenuCount();
   }
  }
 });
}

App();
