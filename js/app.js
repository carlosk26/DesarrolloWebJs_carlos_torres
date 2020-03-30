var calculadora = {

	visor: document.getElementById("display"),
	resultadoDisplay: "0",
	operacion: "",
	valorA: 0,
valorB: 0,
	valorCFinal: 0,
	resultado: 0,
	auxTeclaIgual: false,

	init: (function(){
		this.asignarEventosFormatoBotones(".tecla");
		this.asignarEventosaFuncion();
	}),

	//Eventos de formato de botones

	asignarEventosFormatoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoAchicaBoton;
			x[i].onmouseleave = this.eventoVuelveBoton;
		};
	},

	eventoAchicaBoton: function(event){
		calculadora.AchicaBoton(event.target);
	},

	eventoVuelveBoton: function(event){
		calculadora.AumentaBoton(event.target);
	},



	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.limpiaDisplay();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiaSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresoOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},

	limpiaDisplay: function(){

	    this.resultadoDisplay = "0";
		this.operacion = "";
		this.valorA = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.valorCFinal = 0;
		this.updateVisor();
	},

	cambiaSigno: function(){
		if (this.resultadoDisplay !="0") {
			var aux;
			if (this.resultadoDisplay.charAt(0)=="-") {
				aux = this.resultadoDisplay.slice(1);
			}	else {
				aux = "-" + this.resultadoDisplay;
			}
		this.resultadoDisplay = "";
		this.resultadoDisplay = aux;
		this.updateVisor();
		}
	},

	ingresoDecimal: function(){
		if (this.resultadoDisplay.indexOf(".")== -1) {
			if (this.resultadoDisplay == ""){
				this.resultadoDisplay = this.resultadoDisplay + "0.";
			} else {
				this.resultadoDisplay = this.resultadoDisplay + ".";
			}
			this.updateVisor();
		}
	},

	ingresoNumero: function(valor){
		if (this.resultadoDisplay.length < 8) {

			if (this.resultadoDisplay=="0") {
				this.resultadoDisplay = "";
				this.resultadoDisplay = this.resultadoDisplay + valor;
			} else {
				this.resultadoDisplay = this.resultadoDisplay + valor;
			}
		this.updateVisor();
		}
	},

	ingresoOperacion: function(oper){
		this.valorA = parseFloat(this.resultadoDisplay);
		this.resultadoDisplay = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.updateVisor();
	},

	verResultado: function(){

		if(!this.auxTeclaIgual){
			this.segundoValor = parseFloat(this.resultadoDisplay);
			this.valorCFinal = this.segundoValor;
			this.efectuarOperacion(this.valorA, this.segundoValor, this.operacion);

		} else {
			this.efectuarOperacion(this.valorA, this.valorCFinal, this.operacion);
		}

		this.valorA = this.resultado;
		this.resultadoDisplay = "";

		if (this.resultado.toString().length < 9){
			this.resultadoDisplay = this.resultado.toString();
		} else {
			this.resultadoDisplay = this.resultado.toString().slice(0,8) + "...";
		}

		this.auxTeclaIgual = true;
		this.updateVisor();

	},

	efectuarOperacion: function(valorA,valorB, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(valorA +valorB);
			break;
			case "-":
				this.resultado = eval(valorA -valorB);
			break;
			case "*":
				this.resultado = eval(valorA *valorB);
			break;
			case "/":
				this.resultado = eval(valorA /valorB);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(valorA));
		}
	},

	updateVisor: function(){
		this.visor.innerHTML = this.resultadoDisplay;
	}

};

calculadora.init();
