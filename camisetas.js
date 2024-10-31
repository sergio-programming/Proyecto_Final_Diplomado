document.addEventListener('DOMContentLoaded', function() {
    loadShirts();
});

function loadShirts() {
    let shirts = JSON.parse(localStorage.getItem('shirts')) || [];
    renderShirts(shirts);
}

function renderShirts(shirts) {
    let shirtsContainer = document.getElementById('shirtsContainer');
    shirtsContainer.innerHTML = '';

    shirts.forEach(function(shirt, index) {
        let shirtElement = createShirtElement(shirt, index);
        shirtsContainer.appendChild(shirtElement);
    });
}

function createShirtElement(shirt, index) {
    let shirtElement = document.createElement('div');
    shirtElement.className = 'col-lg-4 col-mg-6 col-sm-12 note';

    let img = document.createElement('img');
    img.src = shirt.image;
    img.width = 200;
    img.className = 'img-fluid';
    img.alt = shirt.reference;

    let reference = document.createElement('h4');
    reference.textContent = shirt.reference;

    let price = document.createElement('p');
    price.textContent = `$${shirt.price}`;

    shirtElement.appendChild(img);
    shirtElement.appendChild(reference);
    shirtElement.appendChild(price);

    return shirtElement;
}
