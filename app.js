db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => { //cycle through the docs
        console.log(doc.data()) //log each one
    })
})