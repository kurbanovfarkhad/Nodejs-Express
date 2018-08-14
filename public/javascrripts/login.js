$(document).ready(()=>{
    
    $('#login').submit(function(e){
        e.preventDefault();
        var data={ 
            name: $('#Lname').val(),
            password: $('#Lpassword').val()                       
        };

        $.ajax({
            url:'/auth/login',
            type:'POST',
            data: JSON.stringify(data),
            contentType:'application/json',
            
            success:function(data){                
                console.log(data);
                //$(location).attr('href','/main.hbs');
                //$(body).html('/main')
                if(data.take==='login'){
                    window.location.replace('/');
                }else if(data.take==="wrong"){
                    $("#mess").html('<b>login or password is wrong</b>');
                }             
            }
        });
    });

});