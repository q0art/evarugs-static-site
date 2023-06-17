import { getUserLocation } from './location';
import Swiper from 'swiper';
import '../scss/index.scss';
import 'swiper/css';

const app = () => {
	//
	getUserLocation();
	// все клики/mouseover'ы делаем на документе
	const modalWindow = document.querySelector('.modal');
	const modalButtonOpen = document.querySelector('.preview_left--button');
	const modalButtonClose = document.querySelector('.modal--button');

	document.addEventListener('click', ({ target }) => {
		const modalOpenNew = target.closest('.preview_left--button');
		if (!modalOpenNew) return;
		// дальше делаешь с кнопкой что нужно
		// можно даже написать простую функцию типа onDocumentClick и передавать в нее коллбеки
	});

	modalButtonOpen.addEventListener('click', () => {
		modalWindow.classList.add('visible_modal');
		modalWindow.classList.add('e-on');
	});

	modalButtonClose.addEventListener('click', () => {
		modalWindow.classList.remove('visible_modal');
		modalWindow.classList.remove('e-on');

		// а вообще такие штуки лучше делать на js
		// например:
		// ....open:
		// popup.style.display = 'block'
		// ....close:
		// popup.animate(...).finished.then(() => { popup.style.display = 'none' });
	});

	modalWindow.addEventListener('click', (event) => {
		const isModal = event.target.closest('.modal_wrapper');

		if (!isModal) {
			modalWindow.classList.remove('visible_modal');
		}
	});

  // @todo сделать неактивные слайды прозрачными, добавить отключение слайдера на планшете
	// то есть по ресайзу (обязательно найди функцию типа throttle) нужно либо удалять старый слайдер, либо (если его нет) создавать новый
	const swiper = new Swiper('.review_swiper', { // а если слайдера 2?)
		slidesPerView: 3,
		loop: true,
		speed: 1000,
		spaceBetween: 60,
		// centeredSlides: true,
		slideToClickedSlide: true,
		breakpoints: {
			640: {
				// slidesPerView: 3,
				// loop: true, это лишнее, конфиг все равно наследуется на брейпоинты
				spaceBetween: 20,
			},
			768: {
				// loop: true,
				// slidesPerView: 3,
				spaceBetween: 40,
			},
			1024: {
				// loop: true,
				// slidesPerView: 3,
				spaceBetween: 60,
			},
		},
	});
};

app();
