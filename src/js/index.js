import { getUserLocation } from './api/location';
import Swiper from 'swiper';
import '../scss/index.scss';
import 'swiper/css';

const app = () => {
	const review = new Swiper('.review', {
		speed: 500,
		spaceBetween: 60,
		slidesPerView: 3,
		centeredSlides: true,
		slideToClickedSlide: true,

		direction: getDirection(),
		on: {
			resize: function () {
				review.changeDirection(getDirection());
			},
		},
	});

	function getDirection() {
		return window.innerWidth <= 768 ? 'vertical' : 'horizontal';
	}

	const userCities = [];
	getUserLocation()
		.then((city) => {
			userCities.push(city);
			//
			const headerPoint = document.querySelector('.header_point--text');
			headerPoint.textContent = userCities[userCities.length - 1];
		})
		.catch((error) => {
			console.error(error);
		});

	const viewOn = [{ transform: 'scale(0)' }, { transform: 'scale(1)' }];
	const viewOff = [{ transform: 'scale(1)' }, { transform: 'scale(0)' }];
	const timing = { duration: 500, iterations: 1 };
	const modal = document.querySelector('.modal');

	document.addEventListener('click', ({ target }) => {
		const modalOpen = target.closest('.preview_left--button');

		if (!modalOpen) return;

		modal.style.display = 'flex';
		modal.animate(viewOn, timing).finished.then(() => {
			modal.style.backdropFilter = 'blur(20px)';
		});
	});

	modal.addEventListener('click', ({ target }) => {
		const modalClose = target.closest('.modal--button');

		if (!modalClose) return;

		modal.style.backdropFilter = 'none';
		modal.animate(viewOff, timing).finished.then(() => {
			modal.style.display = 'none';
		});
	});

	modal.addEventListener('click', ({ target }) => {
		const isModal = target.closest('.modal_wrapper');

		if (!isModal) {
			modal.style.backdropFilter = 'none';
			modal.animate(viewOff, timing).finished.then(() => {
				modal.style.display = 'none';
			});
		}
	});
};

app();
