const canvas = document.getElementById('rippleCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
});

let trail = [];

// Store mouse positions and their fading alpha values
document.addEventListener('mousemove', (e) => {
	trail.push({ x: e.clientX, y: e.clientY, alpha: 0.5 });
});

function animate() {
	// Clear the canvas for the next frame
	ctx.clearRect(0, 0, width, height);
	
	// Draw each line segment from the stored mouse points
	ctx.lineWidth = 2;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';

	// Loop through the trail array and draw lines
	for (let i = 0; i < trail.length - 1; i++) {
		let current = trail[i];
		let next = trail[i + 1];

		// Set the line color with fading alpha
		ctx.strokeStyle = `rgba(255, 128, 255, ${current.alpha})`;

		// Draw the line
		ctx.beginPath();
		ctx.moveTo(current.x, current.y);
		ctx.lineTo(next.x, next.y);
		ctx.stroke();

		// Fade out the lines over time
		current.alpha -= 0.05;
		if (current.alpha <= 0) {
			trail.splice(i, 1); // Remove the point if it's fully faded
			i--; // Adjust index to recheck the new line after removal
		}
	}

	// Continuously animate
	requestAnimationFrame(animate);
}

animate();