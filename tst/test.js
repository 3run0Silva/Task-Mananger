"use strict"

const draggableElement = document.getElementById('draggableDiv');
const containerLeft = document.getElementById('container-left');
const containerRight = document.getElementById('container-right');

let offsetX, offsetY, isDragging = false;

draggableElement.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);

function onMouseDown(e) {
    isDragging = true;
    offsetX = e.clientX - draggableElement.getBoundingClientRect().left;
    offsetY = e.clientY - draggableElement.getBoundingClientRect().top;
    draggableElement.style.cursor = 'grabbing';
}

function onMouseMove(e) {
    if (!isDragging) return;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    draggableElement.style.left = x + 'px';
    draggableElement.style.top = y + 'px';
}

function onMouseUp() {
    isDragging = false;
    draggableElement.style.cursor = 'grab';

    // Check if the draggable div is inside a container
    const containerLeftRect = containerLeft.getBoundingClientRect();
    const containerRightRect = containerRight.getBoundingClientRect();
    const draggableRect = draggableElement.getBoundingClientRect();

    if (isInside(containerLeftRect, draggableRect)) {
        containerLeft.appendChild(draggableElement);
        draggableElement.style.left = '0';
        draggableElement.style.top = '0';
    } else if (isInside(containerRightRect, draggableRect)) {
        containerRight.appendChild(draggableElement);
        draggableElement.style.left = '0';
        draggableElement.style.top = '0';
    }
}

function isInside(containerRect, elementRect) {
    return (
        elementRect.left >= containerRect.left &&
        elementRect.right <= containerRect.right &&
        elementRect.top >= containerRect.top &&
        elementRect.bottom <= containerRect.bottom
    );
}
