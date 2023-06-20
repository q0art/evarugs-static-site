export const getUserLocation = () => {
	return new Promise((resolve, reject) => {
		const success = (pos) => {
			const { latitude, longitude } = pos.coords;
			const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`;

			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					if (data.city) {
						resolve(data.city);
					} else {
						resolve('Ваш город');
					}
				})
				.catch((error) => {
					console.error('Error:', error);
					reject(error);
				});
		};

		const error = () => {
			const ip = '';
			const http = new XMLHttpRequest();

			http.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					const jsonData = JSON.parse(this.responseText);
					if (jsonData.city) {
						console.log(jsonData.city);
						resolve(jsonData.city);
					} else {
						resolve('Ваш город');
					}
				}
			};
			http.open('GET', `https://ipwhois.app/json/?lang=ru${ip}`, true);
			http.send();
		};

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
			console.error('error with geolocation');
			error();
		}
	});
};
