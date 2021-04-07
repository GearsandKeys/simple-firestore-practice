const cafeList = document.querySelector('#cafe-list'); //grabs ul from html
const form = document.querySelector('#add-cafe-form');




function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');

    li.setAttribute('data-id', doc.id); //doc.id references the unique key, kinda like adding a class with a value of the unique key
    name.textContent = doc.data().name; //makes name equal to the name of doc
    city.textContent = doc.data().city; //makes city equal the city name in doc

    li.appendChild(name); //add the name to the list
    li.appendChild(city); //add the city to the list
    

    cafeList.appendChild(li); //adds the whole li to the cafeList
}

// getting Data
form.addEventListener('submit', (e) => {
    e.preventDefault() //prevents page refresh
    db.collection('cafes').add({
        //object to add and add it to cafes collection
        name: form.name.value,
        city: form.city.value
    })
    //clears values that were typed in the form after button is clicked.
    form.name.value = '';
    form.city.value = '';
})
db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => { //cycle through the docs
        renderCafe(doc);
        //console.log(doc.data()) //log each one
    })
})