// Revised generatePlasma function with 'time' parameter
// Revised generatePlasma function
// Revised generatePlasma function
function generatePlasma(canvas, width, height, colors) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const frequency = 0.02;
  const center = 128;
  const numColors = colors.length;

  for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % width;
      const y = Math.floor(i / 4 / width);
      const value = Math.sin(x * frequency) + Math.sin(y * frequency);

      // Simplified color index calculation
      const colorIndex = Math.floor((value + center) % numColors);

      const color = hexToRgb(colors[colorIndex]);
      data[i] = color.r;
      data[i + 1] = color.g;
      data[i + 2] = color.b;
      data[i + 3] = 255; // Alpha channel
  }

  ctx.putImageData(imageData, 0, 0);
}

// ... Rest of the code (animatePlasma, hexToRgb, window.onload) remains unchanged


// Animate Plasma Function with Color Change
function animatePlasma(canvas, width, height, initialColors, speed, colorChangeInterval) {
  let time = 0;
  let colors = [...initialColors];
  let lastColorChangeTime = Date.now();

  function updateColors() {
    // Debugging: Log the current colors before updating
    console.log("Before updating colors:", colors);

    colors.push(colors.shift());

    // Debugging: Log the new colors after updating
    console.log("After updating colors:", colors);
  }

  function render() {
      const currentTime = Date.now();
      if (currentTime - lastColorChangeTime > colorChangeInterval) {
          updateColors();
          lastColorChangeTime = currentTime;
      }

      generatePlasma(canvas, width, height, colors, time);
      time += speed;
      requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

function hexToRgb(hex) {
  if (!hex) {
      console.error("Invalid color value:", hex);
      return { r: 0, g: 0, b: 0 }; // Return black or some default color
  }

  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
}

