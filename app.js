const cafeList = document.querySelector('#cafe-list'); //grabs ul from html
const form = document.querySelector('#add-cafe-form');





function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    const deleteCross = document.createElement('div') //did div here, but span would work, this is the x for delete

    li.setAttribute('data-id', doc.id); //doc.id references the unique key, kinda like adding a class with a value of the unique key
    name.textContent = doc.data().name; //makes name equal to the name of doc
    city.textContent = doc.data().city; //makes city equal the city name in doc
    deleteCross.textContent = "x"; //adds an x to the div to be our delete button

    li.appendChild(name); //add the name to the list
    li.appendChild(city); //add the city to the list
    li.appendChild(deleteCross); //adds our x's the each list item

    cafeList.appendChild(li); //adds the whole li to the cafeList

    //delete data
    deleteCross.addEventListener('click', (e) => {
        e.stopPropagation(); //stops bubbling and propagation
        let id = e.target.parentElement.getAttribute('data-id'); //gets the unique id of the element that we click
        db.collection('cafes').doc(id).delete(); //uses id to grab a single doc and delete it from firestore

    }) 
}

//getting data
// db.collection('cafes').where('city', "==", "Marioland").orderBy('name').get().then((snapshot) => { 
//     snapshot.docs.forEach(doc => { //cycle through the docs
//         renderCafe(doc);
//         //where('city', "==", "Marioland") would make a query for only Marioland city 
//         //.orderBy('name') puts them in alphabetical order, beware of how it treats capitals
//         //console.log(doc.data()) //log each one
//     })
// })


// saving data
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

// real-time listener
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        //console.log(change.doc.data())
        //console.log(change.type)
        if(change.type == 'added'){
            //add it to the DOM
            renderCafe(change.doc) //runs the renderCafe function to add it
        } else if (change.type == "removed"){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']'); //grabs the li element with matching id
            cafeList.removeChild(li); //remove it from DOM
        }
    })
})
