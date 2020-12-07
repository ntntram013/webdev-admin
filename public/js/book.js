function validateBook(form) {
    let check = true;
    const isbn = document.forms[form]["isbn"].value;
    const name = document.forms[form]["bookName"].value;
    const author = document.forms[form]["author"].value;
    const publisher = document.forms[form]["publisher"].value;
    const price = document.forms[form]["price"].value;
    const page = document.forms[form]["totalPage"].value;
    const category = document.forms[form]["category"].value;
    const coverForm = document.forms[form]["coverForm"].value;
    const detail = document.forms[form]["detail"].value;

    if (isbn === "") {
        check = false;
    }
    if(name ===""){
        check = false;
    }
    if(author ===""){
        check = false;
    }
    if(publisher ===""){
        check = false;
    }
    if(price == "" || price < 0){
        check = false;
    }
    if(page =="" || page < 1){
        check = false;
    }
    if(category ===""){
        check = false;
    }
    if(coverForm ===""){
        check = false;
    }
    if(detail ===""){
        check = false;
    }
    if(check === false){
        alert('Vui lòng nhập các trường còn thiếu/không hợp lệ');
    }
    return check;

}