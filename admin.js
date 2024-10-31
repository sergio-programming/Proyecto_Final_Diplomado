document.addEventListener('DOMContentLoaded', function(){
    let addButton = document.getElementById("addButton");
    let shirtInputReference = document.getElementById("shirtInputReference");
    let shirtInputPrice = document.getElementById("shirtInputPrice");
    let shirtInputImage = document.getElementById("shirtInputImage");
    let saveButton = document.getElementById("saveButton");

    addButton.addEventListener('click', function(){
        addButton.style.display = 'none';
        shirtInputReference.style.display = 'block';
        shirtInputPrice.style.display = 'block';
        shirtInputImage.style.display = 'block';
        saveButton.style.display = 'block';
    })

    saveButton.addEventListener('click', function(){
        addOrUpdateShirt();
    })

    loadShirts();

});

function addOrUpdateShirt() {
    console.log('addOrUpdateShirt');
    let shirtInputReferenceValue = document.getElementById("shirtInputReference").value.trim();
    let shirtInputPriceValue = document.getElementById("shirtInputPrice").value.trim();
    let shirtInputImageValue = document.getElementById("shirtInputImage").value.trim();

    if (shirtInputReferenceValue !== '' && shirtInputPriceValue !== '' && shirtInputImageValue !== '') {
        let shirts = JSON.parse(localStorage.getItem('shirts')) || [];
        let shirtIndexElement = document.getElementById('shirtIndex');

        let shirtIndex = shirtIndexElement ? parseInt(shirtIndexElement.value) : -1;
        if (!isNaN(shirtIndex) && shirtIndex >= 0 && shirtIndex < shirts.length) {
            shirts[shirtIndex] = {
                reference: shirtInputReferenceValue,
                price: shirtInputPriceValue,
                image: shirtInputImageValue,
                stock: shirts[shirtIndex].stock
            }
        }else{
            shirts.push({
                reference: shirtInputReferenceValue,
                price: shirtInputPriceValue,
                image: shirtInputImageValue,
                stock: false
            });
        }
        localStorage.setItem('shirts', JSON.stringify(shirts));

        loadShirts();

        document.getElementById('shirtInputReference').value = '';
        document.getElementById('shirtInputPrice').value = '';
        document.getElementById('shirtInputImage').value = '';

        document.getElementById('addButton').style.display = 'block';
        document.getElementById('shirtInputReference').style.display = 'none';
        document.getElementById('shirtInputPrice').style.display = 'none';
        document.getElementById('shirtInputImage').style.display = 'none';
        document.getElementById('saveButton').style.display = 'none';

        if(shirtIndexElement) {
            shirtIndexElement.value = '';
        }

    } else {
        alert("Por favor diligencie todos los campos")
    }
}

function loadShirts(){
    let shirts = JSON.parse(localStorage.getItem('shirts')) || []
    console.log(shirts)
    renderShirts(shirts);
}

function renderShirts(shirts) {
    let shirtsContainer = document.getElementById('shirtsContainer');
    shirtsContainer.innerHTML = '';

    let shirtSold = 0;

    shirts.forEach(function(shirt, index){
        let shirtElement = createShirtElement(shirt, index);
        shirtsContainer.appendChild(shirtElement); 
        if (shirt.stock){
            shirtSold++;
        }

    })
}

function createShirtElement(shirt, index) {
    let shirtElement = document.createElement('div');
    shirtElement.className = 'col-lg-4 col-mg-6 col-sm-12 note';

    let checkboxWrapper = document.createElement('div');
    checkboxWrapper.className = 'checkbox-wrapper';

    let checkbox =document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'cb-' + index;
    checkbox.checked = shirt.stock

    checkbox.addEventListener('change', function(){

    })

    let label = document.createElement('label');
    label.classList.add('check-box');
    label.setAttribute('for', 'cb' + index);

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(label);

    let img = document.createElement('img');
    img.src = shirt.image;
    img.width = 200;
    img.className = 'img-fluid';
    img.alt = shirt.reference;
    let reference = document.createElement('h4');
    reference.textContent = shirt.reference;
    let price = document.createElement('p');
    price.textContent = `$${shirt.price}`;

    shirtElement.appendChild(checkboxWrapper);
    shirtElement.appendChild(img);
    shirtElement.appendChild(reference);
    shirtElement.appendChild(price);    
    

    let editButton = document.createElement('button');
    editButton.className = 'edit-button'
    editButton.textContent = 'Editar';

    editButton.addEventListener('click', function(){
        editShirt(shirt.id)
    })

    shirtElement.appendChild(editButton)

    let deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button'
    deleteButton.textContent = 'Borrar';

    deleteButton.addEventListener('click', function(){
        deleteShirt(shirt.id)
    })

    shirtElement.appendChild(deleteButton)

    return shirtElement;

}

function editShirt(index) {
    let shirts = JSON.parse(localStorage.getItem('shirts')) || [];
    let shirt = shirts[index];
    
    if (shirt) {
        document.getElementById("shirtInputReference").value = shirt.reference;
        document.getElementById("shirtInputPrice").value = shirt.price;
        document.getElementById("shirtInputImage").value = shirt.image;

        document.getElementById('shirtIndex').value = index;

        
        document.getElementById("addButton").style.display = 'none';
        document.getElementById("shirtInputReference").style.display = 'block';
        document.getElementById("shirtInputPrice").style.display = 'block';
        document.getElementById("shirtInputImage").style.display = 'block';
        document.getElementById("saveButton").style.display = 'block';
    } else {
        console.error("Camiseta no encontrada en el índice:", index);
    }
}

function deleteShirt(index) {
    let shirts = JSON.parse(localStorage.getItem('shirts')) || [];
    if (index >= 0 && index < shirts.length) {
        shirts.splice(index, 1); // Elimina la camiseta del array
        localStorage.setItem('shirts', JSON.stringify(shirts)); // Actualiza el local storage
        loadShirts(); // Recarga la lista de camisetas
    } else {
        console.error("Índice fuera de rango para eliminar:", index);
    }
}


function resetForm() {
    document.getElementById("shirtInputReference").value = '';
    document.getElementById("shirtInputPrice").value = '';
    document.getElementById("shirtInputImage").value = '';
    document.getElementById("addButton").style.display = 'block';
    document.getElementById("shirtInputReference").style.display = 'none';
    document.getElementById("shirtInputPrice").style.display = 'none';
    document.getElementById("shirtInputImage").style.display = 'none';
    document.getElementById("saveButton").style.display = 'none';
    document.getElementById('shirtIndex').value = '';
}
