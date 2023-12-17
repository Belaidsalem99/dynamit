let names = document.getElementById('names');
let fun = document.getElementById('fun');
let phone = document.getElementById('phone');
let place = document.getElementById('place');
let prices = document.getElementById('prices');
let url = document.getElementById('url');
let submit = document.getElementById('submit');


let mood = 'create';
let tmp;



// create product

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}



submit.onclick = function(){
    let newPro = {
        names:names.value.toLowerCase(),
        fun:fun.value,
        phone:phone.value,
        place:place.value,
        prices:prices.value,
        url:url.value,
    }

    if(names.value != ''
    && fun.value != ''
    && phone.value != ''){
            if(mood === 'create'){
                dataPro.push(newPro);
            }else{
                dataPro[  tmp  ] = newPro;
                mood = 'create';
                submit.innerHTML = 'اضافة';
            }
    

    }
    clearData()
    


    
    // save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro))

    
    showData()
}

//clear inputs

function clearData(){
    names.value = '';
    fun.value = '';
    phone.value = '';
    place.value = '';
    prices.value = '';
    url.value = '';
}


//read

function showData()
{
    let table = '';
    for(let i = 0; i < dataPro.length;i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].names}</td>
            <td>${dataPro[i].fun}</td>
            <td>${dataPro[i].phone}</td>
            <td>${dataPro[i].place}</td>
            <td>${dataPro[i].prices}</td>
            <td>${dataPro[i].url}</td>
            <td><button onclick="updateData(${i})" id="update">تعديل</button></td>
            <td><button onclick="deleteData( ${i} )" id="delete">حدف</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">حدف الكل (${dataPro.length})</button>
        `
    }else {
        btnDelete.innerHTML = '';
    }
}
showData()


//delete
function deleteData(i)
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}


//update
function updateData(i){
    names.value = dataPro[i].names;
    fun.value = dataPro[i].fun;
    phone.value = dataPro[i].phone;
    place.value = dataPro[i].place;
    prices.value = dataPro[i].prices;
    url.value = dataPro[i].url;
    submit.innerHTML = 'تعديل';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}


//search
let searchMood = 'name';

function getSearchMood(id)
{
    let search = document.getElementById('search');
   if(id == 'searchName'){
    searchMood = 'الأسم';
    
   }else{
    searchMood = 'الوظيفة';
   }
   search.placeholder = 'بحث '+ searchMood;
   search.focus()
   search.value = '';
   showData()
}

function searchData(value)
{
    let table = '';
    for(let i = 0; i < dataPro.length;i++){
        if(searchMood == 'الأسم')
        {
            
            if(dataPro[i].names.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].names}</td>
                    <td>${dataPro[i].fun}</td>
                    <td>${dataPro[i].phone}</td>
                    <td>${dataPro[i].place}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].url}</td>
                    <td><button onclick="updateData(${i})" id="update">تعديل</button></td>
                    <td><button onclick="deleteData( ${i} )" id="delete">حدف</button></td>
                </tr>
                `;
            }
        


        }
        else{
            
                if(dataPro[i].fun.includes(value.toLowerCase())){
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].names}</td>
                        <td>${dataPro[i].fun}</td>
                        <td>${dataPro[i].phone}</td>
                        <td>${dataPro[i].place}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].url}</td>
                        <td><button onclick="updateData(${i})" id="update">تعديل</button></td>
                        <td><button onclick="deleteData( ${i} )" id="delete">حدف</button></td>
                    </tr>
                    `;
                }
        
        }
    }   
    document.getElementById('tbody').innerHTML = table;
}


var typed = new Typed('#element', {
    strings: ['مرحباً بك في ديناميت'],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 3000,
    loop: true
  });