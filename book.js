// data loading spinners...............................
 const loadingData = spinnerStyle =>{
     document.getElementById('loadData').style.display = spinnerStyle;
 }

// //display total counting data......................
 const toggoleTotal = displayTotal =>{
     document.getElementById('setTotal').style.display = displayTotal;
 }
// display card data..................................
 const toggleData = displayData =>{
     document.getElementById('cardstotalDiv').style.display = displayData;
 }


const getInputValue = () =>{
    // get input value ...........................
    const inputVal = document.getElementById('inputFild');
    const getTxt = inputVal.value ;
    inputVal.value = '';
    //data loading spinners.......................
     loadingData('block');
    //total counting data..........................
     toggoleTotal('none');
    //total card data............................. 
     toggleData('none');
    // console.log(getTxt)
    const url = `https://openlibrary.org/search.json?q=${getTxt}`
    fetch(url)
    .then(res => res.json())
    .then(data => setBookData(data)
    )
}

const setBookData = books =>{
    // console.log(books.numFound)
    const allbooks = books.docs; 
     console.log(allbooks)
    
    // get total counts of books ..................
    const total = document.getElementById('setTotal');
    total.innerHTML=`Total is <span class='text-info fs-4'>${allbooks.length}</span> out of <span class= 'text-info fs-4'> ${books.numFound}</span> `

    // books details div ..........................
    const bookDiv = document.getElementById('bookCard');
    bookDiv.textContent='';

    // error hendaling div ........................
    const errorDiv = document.getElementById('errorDiv');
    errorDiv.innerHTML='';

    // show arrow massage .........................
    if(allbooks.length===0){
        const emptydiv = document.createElement('div');
        emptydiv.classList.add('emptydiv');
        emptydiv.innerHTML= `
        <h1 class="text-center text-danger  mx-auto" >Sorry! this kinds of books are not avilble here</h1>
        <p class="text-center text-white mx-auto">please search another valid books!</p>
        `
        errorDiv.appendChild(emptydiv);
       
    }

    //show final result..............................
   else{
        allbooks?.forEach(book =>{
            // console.log(book);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML= `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-100 h-50" alt="">
                <div class="card-body">
                     <h5 class="card-title ">${book.title}</h5>
                     <p class="card-text">Autoure Name: ${book.author_name? book.author_name[0] : 'author name not found'}</p>
                     <p class="card-text">Publisher: ${book.publisher? book.publisher[0] : 'publisher are not avilable'}</p>
                     <p class="card-text"><b>First Publish in: ${book.first_publish_year? book.first_publish_year : 'Publish year not avilable'}</b></p>
                </div>
            </div>
            `
            bookDiv.appendChild(div);
         })  
       
     }
     //data loading spinners................................
     loadingData('none');

     //total counting data..................................
      toggoleTotal('block');
     // total card data..................................... 
      toggleData('block');

}