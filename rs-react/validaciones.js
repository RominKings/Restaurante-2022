$(function(){
    $("#formularioMesas").validate({
         rules: {
                numMesa:"required"
            }, //rules
        messages: {
            numMesa: {
                required: 'Ingresa un nombre'
            },
        
        }
    }); 
  }); 