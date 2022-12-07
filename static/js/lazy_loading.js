let images = document.querySelectorAll('.img-content');

let options = {
	root: document.querySelector('#scrollArea'),
	rootMargin: '0px',
	threshold: 0.1
};

function handleImg(myImg, observer) {
	myImg.forEach(myImgSingle => {
		if (myImgSingle.intersectionRatio > 0) {
			loadImage(myImgSingle.target);
		}
	})
}

function loadImage(image) {
	image.src = image.getAttribute('data');
}

let observer = new IntersectionObserver(handleImg, options);

images.forEach(img => {
	observer.observe(img);
})