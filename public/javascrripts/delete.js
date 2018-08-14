$(document).ready(()=>{
    $("#escape").on('click', function(e){
        //e.preventDefault();
        $.ajax({
            url:'/session/escape',
            type:'Get', 
            success:function(data){                
               // console.log(data);
                //$(location).attr('href','/main.hbs');
                //$(body).html('/main')
                //if(data.ok===true){
                    window.location.replace('/');
                //}else if(data.ok==="exist"){
                //    $("#messR").html('<b>User name is engaged</b>');
               // }             
            }
        });
    });
   
});