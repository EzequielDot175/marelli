//=============================================================================>
// SCRIPT - EVENTOS - LARALA.COM ==============================================>
//=============================================================================>
	
	//------------------------------------------------------
	// DEFAULT ---------------------------------------------
	//------------------------------------------------------
	var i, limite, positions, totalItems, currentEvento;
	//cantidad de items
	totalItems = $('.anteriores > .contenido > li').length;
	//current inicial, (comienza del último)
	currentEvento = 1;


	//------------------------------------------------------
	// CARGA INICIAL ---------------------------------------
	//------------------------------------------------------
	$(document).ready(function(){
		
		//carga items galeria
		cargaGaleria();

		//detecta cambio en el tamaño de l pantalla
		$(window).resize(function(){
			currentEvento = totalItems;
			cargaGaleria();
		});
           
	});


	//------------------------------------------------------
	// CARGA GALERIA ---------------------------------------
	//------------------------------------------------------
	function cargaGaleria(){
		
		//cantidad de items
		totalItems = $('.anteriores > .contenido > li').length;
	
		//cantidad de items para MOBILE / DESKTOP
	  	if($(window).width() < 990){
	  		positions = 1;
			limite = (currentEvento + positions -1 );
		}else{
	  		positions = 3;
			limite = (currentEvento - positions +1 );
		}

		//muestra los elementos
		for(i=totalItems; i > 0 ; i-- ){
			if(i > currentEvento || i < limite) {		
				$('#itemGaleria'+i).css('display','none');
			}else{			
				$('#itemGaleria'+i).css('display','block');
			}
		}

		//primer o último item (oculta las flechas)
		if(currentEvento <= positions ){
			$('#masGaleria').css('display','none');
		}else{
			$('#masGaleria').css('display','block');
		} 

		if (currentEvento >= totalItems){
			$('#menosGaleria').css('display','none');
		}else{
			$('#menosGaleria').css('display','block');
		}
	
	}


	//------------------------------------------------------
	// FLECHAS MAS MENOS GALERIA ---------------------------
	//------------------------------------------------------
	function masMenosGaleria(currentE){
		//actualiza el valor de current
		currentEvento = currentE;
		//carga nuevamente la galeria
		cargaGaleria();
	}
