$(document).ready(function(event){

    //$('.form').not(".formOne").hide();
    $('.formOne').css("display","block");
    
    // Push all forms into an array
    let arr=[];
    $(".form").each(function(){ 
        arr.push($(this));
    });
    
    let curr = arr[0];
    onlyNum()
    charLimit(curr);

    // Iterate on array whilst checking emptiness
    $(".button").click(function(){
        if(isEmpty(curr) && isNum(curr) && isLimit(curr) && isEmail(curr) && isVerify(curr,code)){
            // if (not last form ){Go next}
            //else { Submit form }
            curr.slideUp(500);
            curr.next().slideDown(500);
            // Iteration step
            curr = curr.next();
        }
    });

    // Go back a step to edit previous form
     $("a").click(function(){
         curr.slideUp(500);
         curr.prev().slideDown(500);
         // Iteration step
         curr = curr.prev();
    })
})

function isEmpty(form){
   
    let required = form.children().children().children().filter('.required');
    var allRequired = true;
    required.each(function(){
        if($(this).val() == ''){
            allRequired = false;
        }
    });
    if(!allRequired){
        form.find(".empty").text("please fill all the fields");
        return false;
    }
    return true;
}

function isNum(form){
    let allNumber = true;
    let number = form.children().children().children().filter(".onlynum");
    number.each(function(){
        if(isNaN($(".onlynum").val())) allNumber = false;
    })
    if(!allNumber) return false;
    return true;
}

function isLimit(form){
    let limit;
    if(form.find(".formOne")) limit = 11;
    
    let allLimit = true;
    let limited = form.children().children().children().filter(".charlimit");
    limited.each(function(){
        if ($(this).val().length > limit || $(this).val().length < limit) {
            allLimit = false;
        }
    })
    if(!allLimit){
        $(".char-count").show();
        $(".char-count").text("11 characters required").css("color", "mediumvioletred");
        return false;
    }
    return true;
}


function isEmail(form) {
    let allEmail = true;
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-])?$/;
    let email = form.children().children().children().filter('input[type="email"]');
    email.each(function(){
        if (!(emailReg.test(email.val()))){
            allEmail = false;
        }
    }) 
    if(!allEmail) return false;
    return true;
}

function isVerify(form, code){
    let verified = true;
    let codeInput = form.children().children().children().filter(".verify");
    codeInput.each(function(){
        //generate random number or hash
        alert("Your verification code is "+code);
        if ($(this).val() != code) verified = false;
    })
    if (!verified) {
        alert("BRUH! wrong code");
        return false;
    }
    return true;
}

function charLimit (form){
    let limit;
    if(form.find(".formOne")) limit = 11;

    var valid = true;
    $(".char-count").hide();
    $(".char-count").text("11 characters required").css("color","grey");

    $('input[type="tel"]').focusin( function() {
        
        $(".char-count").show();
        
        $(this).keyup(function(){
           
            $(".char-count").show();
            let counter = limit - $(this).val().length;
            $(".char-count").text(counter + " characters remaining");
           
            if (counter <= 0){
                $(".char-count").css("color", "mediumvioletred");
                valid = false;
            }
            else{
                $(".char-count").css("color", "grey");
                valid = true;
            }

        });
    });
    $('input[type="tel"').focusout( function(){
        $(".char-count").hide();
    });
    return valid;
}

function onlyNum(){

    $(".error").hide();
    $(".onlynum").focusin().keyup(function(){
        if (isNaN($(this).val())){
            $(".error").show();
            $(".error").text(" only numbers allowed");
        }
        else $(".error").hide();
    })

}

function verifyCode(){
    let random = Math.floor(1000 + Math.random() * 9000);
    alert(" Your verification code is: " + random );s
    return random;
}
