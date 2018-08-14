$(document).ready(()=>{
    
    $('#registration').submit(function(e){
        e.preventDefault();
        var data={ 
            name: $('#name').val(),
            password: $('#password').val()                       
        };

        if(data.password.length<=5){
            $("#messR").html('<b>password must be longer than five characters</b>');
        }else{
            $.ajax({
                url:'/reg/registration',
                type:'POST',
                data: JSON.stringify(data),
                contentType:'application/json',
                
                success:function(data){                
                    console.log(data);
                    //$(location).attr('href','/main.hbs');
                    //$(body).html('/main')
                    if(data.take==="registred"){
                        window.location.replace('/');
                        $("#messR").html('<b>Thank for registration</b>');
                    }else if(data.take==="engaged"){
                        $("#messR").html('<b>User name is engaged</b>');
                    }             
                }
            });
        }
    });
});