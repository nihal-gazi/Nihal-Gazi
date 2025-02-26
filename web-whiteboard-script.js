window.onload = function() {
    
    const passiveOptions = { passive: false }
    const canvas = document.getElementById('canvas');
    const canvasWrapper = document.getElementById('canvas-wrapper');
    const context = canvas.getContext('2d');
    const drawButton = document.getElementById('draw');
    const eraseButton = document.getElementById('erase');
    const lineButton = document.getElementById('line');
    const prevSlideButton = document.getElementById('prev-slide');
    const nextSlideButton = document.getElementById('next-slide');
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    const slideIndicator = document.getElementById('slide-indicator');
    const colorDialog = document.getElementById('color-dialog');
    const colorOptions = document.querySelectorAll('.color-option');
    const closeDialogButton = document.getElementById('close-dialog');
    const whiteColorOption = document.querySelector('.color-option[data-color="white"]');
    const colorPaletteButton = document.getElementById('color-palette'); 
    const downloadButton = document.getElementById('download');

    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    document.body.appendChild(customCursor);
    
    
    const customCursorElement = document.getElementById('custom-cursor');

    drawButton.classList.add('selected');
    initializeCanvas();

    let isDrawing = false;
    let isDrawingLine = false;
    let lastX = 0;
    let lastY = 0;
    let startX = 0;
    let startY = 0;
    let lineWidth = 2;
    let strokeColor = 'white';
    let currentSlide = 0;
    const slides = [createEmptySlide()];
    let scale = 1;
    let drawClickCount = 0;
    let selectedColorOption = whiteColorOption;
    let selectedTool = null;

    if (selectedColorOption) {
        selectedColorOption.style.boxShadow = '0px 0px 10px 2px rgba(0,0,0,0.75)';
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Add pointer event listeners
    canvas.addEventListener('pointermove', (e) => {
        updateCursorPosition(e);
        if (!e.pointerType === 'mouse') draw(e);
    });

    canvas.addEventListener('mousemove', (e) => {
        updateCursorPosition(e);
        draw(e);
    });

    canvas.addEventListener('pointerover', () => {
        customCursor.style.display = 'block';
    });

    canvas.addEventListener('pointerout', () => {
        customCursor.style.display = 'none';
    });

    // Add touch event fallbacks
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleTouch(e);
    }, passiveOptions);

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        handleTouch(e);
    }, passiveOptions);
    canvas.addEventListener('touchend', stopDrawing);
    
    const updateCursorPosition = (e) => {
        const rect = canvas.getBoundingClientRect();
        const scrollLeft = canvasWrapper.scrollLeft;
        const scrollTop = canvasWrapper.scrollTop;
        const x = e.clientX - rect.left + scrollLeft;
        const y = e.clientY - rect.top + scrollTop;
        updateCursor(x, y);
    };

    
    
    drawButton.addEventListener('click', handleDrawClick);
    eraseButton.addEventListener('click', () => {
        setDrawingMode('erase');
        //drawClickCount = 0;
        deselectTools();
        eraseButton.classList.add('selected');
    });
    lineButton.addEventListener('click', () => {
        setDrawingMode('line');
        //drawClickCount = 0;
        deselectTools();
        lineButton.classList.add('selected');
    });
    colorPaletteButton.addEventListener('click', () => {
        if(selectedTool !== 'erase'){
        colorDialog.style.display = 'block';}
        else{alert("You cannot select color while erasing. Press 'Ok' to continue.");}
    });
    prevSlideButton.addEventListener('click', prevSlide);
    nextSlideButton.addEventListener('click', nextSlide);
    zoomInButton.addEventListener('click', zoomIn);
    zoomOutButton.addEventListener('click', zoomOut);
    closeDialogButton.addEventListener('click', () => {
        colorDialog.style.display = 'none';
        drawClickCount = 0;
    });
    colorOptions.forEach(option => option.addEventListener('click', chooseColor));

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    downloadButton.addEventListener('click', downloadCanvas);

    function initializeCanvas() {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.lineCap = 'round'; // Add this for better line endings
        context.lineJoin = 'round'; // Add this for better line connections
    }
    
    function downloadCanvas() {
        // Create a temporary canvas to hold the resized content
        const tempCanvas = document.createElement('canvas');
        const tempContext = tempCanvas.getContext('2d');
        
        // Set the temporary canvas size to match the visible area of the drawing
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        
        // Draw the current canvas content onto the temporary canvas
        tempContext.drawImage(canvas, 0, 0);
        
        // Convert the content of the temporary canvas to a data URL
        const dataUrl = tempCanvas.toDataURL();

        // Create an anchor element to facilitate download
        const a = document.createElement('a');
        a.href = dataUrl; // Set href to the data URL
        a.download = 'drawing.png'; // Set the download attribute to specify the file name
        document.body.appendChild(a); // Append anchor to the body
        a.click(); // Programmatically click the anchor element to trigger download
        document.body.removeChild(a); // Clean up: remove the anchor element from the DOM
    }
    
    
    
    
    // Update coordinate handling
    function getCanvasCoordinates(e) {
        const rect = canvas.getBoundingClientRect();
        const scrollLeft = canvasWrapper.scrollLeft;
        const scrollTop = canvasWrapper.scrollTop;
        
        let clientX, clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        return {
            x: (clientX - rect.left + scrollLeft) / scale,
            y: (clientY - rect.top + scrollTop) / scale
        };
    }
    
    
    function handleTouch(e) {
        if (e.touches.length > 1) return;
        const touch = e.touches[0];
        const fakeEvent = {
            clientX: touch.clientX,
            clientY: touch.clientY,
            touches: [touch], // Important for coordinate calculation
            preventDefault: () => {} // Add empty preventDefault
        };
        
        if (e.type === 'touchstart') startDrawing(fakeEvent);
        else if (e.type === 'touchmove') draw(fakeEvent);
    }
    
    
    
    
    
    

    function resizeCanvas() {
        const rect = canvasWrapper.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        loadCurrentSlide();
    }

    function startDrawing(e) {
        if (isDrawing) return;
        isDrawing = true;
        const coords = getCanvasCoordinates(e);
        lastX = coords.x;
        lastY = coords.y;
        startX = coords.x;
        startY = coords.y;
        customCursor.classList.add('active');
        if (selectedTool === 'line') {
            isDrawingLine = true;
        }
    }

    function draw(e) {
        if (!isDrawing) return;
        const coords = getCanvasCoordinates(e);
        
        // Set common stroke properties
        context.strokeStyle = strokeColor;
        context.lineWidth = lineWidth;
        context.lineCap = 'round'; // Add this for better line endings

        if (selectedTool === 'line') {
            if (isDrawingLine) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(slides[currentSlide], 0, 0);
                context.beginPath();
                context.moveTo(startX, startY);
                context.lineTo(coords.x, coords.y);
                context.stroke();
            }
        } else {
            context.beginPath();
            context.moveTo(lastX, lastY);
            context.lineTo(coords.x, coords.y);
            context.stroke();
            [lastX, lastY] = [coords.x, coords.y];
        }
    }


    function stopDrawing() {
        if (!isDrawing) return;
        isDrawing = false;
        customCursor.classList.remove('active');
        if (isDrawingLine) {
            isDrawingLine = false;
            saveCurrentSlide();
        } else {
            saveCurrentSlide();
        }
    }

    function handleDrawClick() {
        //drawClickCount++;
        setDrawingMode('draw');
        deselectTools();
        drawButton.classList.add('selected');
    }

    function setDrawingMode(mode) {
        selectedTool = mode;
        context.globalCompositeOperation = 'source-over'; // Reset composition
        
        if (mode === 'draw') {
            strokeColor = selectedColorOption ? selectedColorOption.dataset.color : 'white';
            lineWidth = 2;
        } else if (mode === 'erase') {
            strokeColor = 'black';
            lineWidth = 10;
            context.globalCompositeOperation = 'destination-out'; // Proper erase mode
        } else if (mode === 'line') {
            strokeColor = selectedColorOption ? selectedColorOption.dataset.color : 'white';
            lineWidth = 2;
        }
    }

    function deselectTools() {
        const toolButtons = document.querySelectorAll('#controls .icon');
        toolButtons.forEach(button => button.classList.remove('selected'));
    }

    function chooseColor(event) {
        const selectedColor = event.target.dataset.color;
        strokeColor = selectedColor;
        if (selectedColorOption) {
            selectedColorOption.style.boxShadow = ''; // Remove shadow from previously selected color
        }
        selectedColorOption = event.target;
        selectedColorOption.style.boxShadow = '0px 0px 10px 2px rgba(0,0,0,0.75)'; // Add shadow to currently selected color
        colorDialog.style.display = 'none';
        
        colorPaletteButton.style.backgroundColor = selectedColor;
        customCursor.style.backgroundColor = selectedColor;
    }

    function createEmptySlide() {
        const slide = document.createElement('canvas');
        slide.width = window.innerWidth;
        slide.height = window.innerHeight;
        const ctx = slide.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, slide.width, slide.height);
        return slide;
    }

    function saveCurrentSlide() {
        slides[currentSlide] = createEmptySlide();
        const slideContext = slides[currentSlide].getContext('2d');
        slideContext.drawImage(canvas, 0, 0);
    }

    function loadCurrentSlide() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(slides[currentSlide], 0, 0);
    }
    
    
    
    
    
    
    

    function prevSlide() {
        if (currentSlide > 0) {
            saveCurrentSlide();
            currentSlide--;
            loadCurrentSlide();
            updateSlideIndicator();
            applySlideAnimation('prev'); // Apply slide animation for previous slide
        }
    }

    function nextSlide() {
        saveCurrentSlide();
        currentSlide++;
        if (!slides[currentSlide]) {
            slides[currentSlide] = createEmptySlide();
            showNotification('New slide added'); // Show notification when a new slide is added
        }
        loadCurrentSlide();
        updateSlideIndicator();
    }

    function showNotification(message) {
        const notificationContainer = document.getElementById('notification-container');
        
        // Create notification element
        const notification = document.createElement('div');
        notification.classList.add('slide-notification');
        notification.textContent = message;
        
        // Append notification to container
        notificationContainer.appendChild(notification);
        
        // Automatically remove notification after a delay (e.g., 3 seconds)
        setTimeout(() => {
            notification.remove();
        }, 3000); // Adjust the delay as needed
    }



    function applySlideAnimation(direction) {
        const canvasWrapper = document.getElementById('canvas-wrapper');
        
        // Remove any existing animation classes
        canvasWrapper.classList.remove('slide-animation-prev', 'slide-animation-next');
        
        // Apply animation class based on direction
        if (direction === 'prev') {
            canvasWrapper.classList.add('slide-animation-prev');
        } else if (direction === 'next') {
            canvasWrapper.classList.add('slide-animation-next');
        }
        
        // Remove animation class after animation completes
        setTimeout(() => {
            canvasWrapper.classList.remove('slide-animation-prev', 'slide-animation-next');
        }, 500); // Adjust timing to match animation duration in milliseconds
    }












    function updateSlideIndicator() {
        slideIndicator.textContent = `Slide: ${currentSlide + 1}`;
    }

    function zoomIn() {
        if (scale < 3) { // Limit maximum zoom-in to 3x
            scale += 0.1;
            applyZoom();
            updateScrollbar();
        }
    }

    function zoomOut() {
        if (scale > 1) { // Limit minimum zoom-out to 1x
            scale -= 0.1;
            applyZoom();
            updateScrollbar();
        }
    }
    
    
    function updateScrollbar() {
        // keep it empty
    }
    

    function applyZoom() {
        canvas.style.transform = `scale(${scale})`;
        canvasWrapper.style.overflow = scale === 1 ? 'hidden' : 'auto';
        resizeCanvas();
    }

    function updateCursor(x, y) {
        customCursor.style.left = `${x}px`;
        customCursor.style.top = `${y}px`;
    }

    

    // Mouse move listener to update cursor position
    canvas.addEventListener('mousemove', (e) => {
        updateCursor(e.clientX, e.clientY);
    });

    // Mouse down listener to activate cursor
    canvas.addEventListener('mousedown', () => {
        customCursor.classList.add('active');
    });

    // Mouse up listener to deactivate cursor
    canvas.addEventListener('mouseup', () => {
        customCursor.classList.remove('active');
    });

    // Mouse out listener to hide cursor when leaving canvas
    canvas.addEventListener('mouseout', () => {
        customCursor.style.display = 'none';
    });

    // Mouse over listener to show cursor when entering canvas
    canvas.addEventListener('mouseover', () => {
        customCursor.style.display = 'block';
    });
}


