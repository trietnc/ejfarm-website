// Testimonials slider
// Vanilla JS: dots, prev/next, autoplay, keyboard support, respects prefers-reduced-motion
(function () {
	const AUTOPLAY_MS = 5000;

	function initTestimonials() {
		const slider = document.querySelector('.testimonial-slider');
		if (!slider) return;

		const slides = Array.from(slider.querySelectorAll('.slide'));
		const dotsContainer = slider.querySelector('.dots');
		const prevBtn = slider.querySelector('.prev');
		const nextBtn = slider.querySelector('.next');

		let current = slides.findIndex(s => s.classList.contains('active')) || 0;
		let intervalId = null;

		// Create dots
		slides.forEach((_, i) => {
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.setAttribute('aria-label', `Show testimonial ${i + 1}`);
			btn.dataset.index = i;
			if (i === current) btn.classList.add('active');
			btn.addEventListener('click', () => goTo(i));
			dotsContainer.appendChild(btn);
		});

		const dots = Array.from(dotsContainer.children);

		function show(index) {
			slides.forEach((s, i) => s.classList.toggle('active', i === index));
			dots.forEach((d, i) => d.classList.toggle('active', i === index));
			current = index;
		}

		function goTo(i) {
			const idx = (i + slides.length) % slides.length;
			show(idx);
			resetAutoplay();
		}

		function next() { goTo(current + 1); }
		function prev() { goTo(current - 1); }

		if (nextBtn) nextBtn.addEventListener('click', next);
		if (prevBtn) prevBtn.addEventListener('click', prev);

		// Keyboard support
		slider.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight') next();
			if (e.key === 'ArrowLeft') prev();
		});

		// Autoplay respecting reduced-motion
		const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		function startAutoplay() {
			if (prefersReduced) return;
			if (intervalId) return;
			intervalId = setInterval(next, AUTOPLAY_MS);
		}
		function stopAutoplay() { if (intervalId) { clearInterval(intervalId); intervalId = null; } }
		function resetAutoplay() { stopAutoplay(); startAutoplay(); }

		// Pause on hover and focus
		slider.addEventListener('mouseenter', stopAutoplay);
		slider.addEventListener('mouseleave', startAutoplay);
		slider.addEventListener('focusin', stopAutoplay);
		slider.addEventListener('focusout', startAutoplay);

		// Start
		show(current);
		startAutoplay();
	}

	// Initialize when DOM ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initTestimonials);
	} else {
		initTestimonials();
	}
})();

