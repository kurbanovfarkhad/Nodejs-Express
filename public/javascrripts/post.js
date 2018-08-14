$(document).ready(()=>{
    $('#post').submit(function(e){
        e.preventDefault();
        var data={ 
            title: $('#title').val(),
            body: $('#body').val()                       
        };

        $.ajax({
            url:'/add/add_post',
            type:'POST',
            data: JSON.stringify(data),
            contentType:'application/json',
            
            success:function(data){                
                console.log(data);
                //$(location).attr('href','/main.hbs');
                //$(body).html('/main')
                if(data.take==="nobody"|| data.take === 'notitle'){
                    $("#mess").html('<b>Fill in all the fields</b>');
                }else if(data.take==="post"){
                    window.location.replace('/');
                }             
            }
        });
    });
});