

$(document).ready(function(){

	//mostrar categoria
	$(document).on("click", "#mostrar-categorias", function(){
		$(this).css('display','none');
		$('#ocultar-categorias').css('display','block');
		$('#categorias').fadeIn();
    });


    //ocultar categoria
	$(document).on("click", "#ocultar-categorias", function(){
		$(this).css('display','none');
		$('#mostrar-categorias').css('display','block');
		$('#categorias').css('display','none');
    });

	//galeriaCategorias
	

    //mover sidebar
	$(document).on("click", "#mover-sidebar", function(){
		posicion = $(this).attr('posicion');
		if(posicion == 'left'){
			$('.sidebar').addClass('sidebar-left');
			$('.contenido').addClass('contenido-left');
			$('.sidebar').removeClass('sidebar-right');
			$('.contenido').removeClass('contenido-right');
			$(this).attr('posicion','right');
		}else{
			$('.sidebar').addClass('sidebar-right');
			$('.contenido').addClass('contenido-right');
			$('.sidebar').removeClass('sidebar-left');
			$('.contenido').removeClass('contenido-left');
			$(this).attr('posicion','left');
		}
    });

});

