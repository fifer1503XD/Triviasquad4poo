
export function getCategories() {
    const questionsQuantity = document.getElementById('questions-number').value
    fetch(`https://opentdb.com/api_category.php`)
        .then(response => response.json())
        .then(data => Categories(data.trivia_categories))  
}

function Categories(data){
    const categories = document.getElementById('questions-category')
    data.forEach(data=>{
        const Category = `<option id"${data.id}" value="${data.id}">${data.name}</option>`
        categories.innerHTML += Category;
    })
    console.log(data)
}

