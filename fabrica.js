       document.getElementById("botonF100").addEventListener("click",function(){Simular(100)});

        document.getElementById("botonF1000").addEventListener("click",function(){Simular(1000)});

         function animateCar() {
            const coche = document.querySelector(".coche");
            coche.classList.remove("animate"); // Reinicia la animación si ya está activada
            void coche.offsetWidth; // Forzar reflow para reiniciar la animación
            coche.classList.add("animate");
        }

        // Función para simular la producción y activar la animación del coche

        function Simular(turnos)
        {
        	animateCar();
            var pElectricas = 0; 
            var pMecanicas = 0;
            var bNormal = 0;
            var bEspecial = 0;
            var galvanizadas = 0;
            var pulidas = 0;
            var pintados = 0;

        Fab = new Fabrica();

        let piezas = Fab.fabricar(turnos);
        for (var i = 0 ; i < piezas.length ; i++) {
        	let pieza = piezas[i];
    		if (piezas[i] instanceof PiezaElectrica)
   			{
        		pElectricas++;
        		if (pieza.potencia == 1 || pieza.potencia == 5) 
        		{
        			bNormal++;
        		} else {
        			bEspecial++;
        		}
    		} else {
        		pMecanicas++;
        		  if(pieza.material == "Acero")
                        {
                         galvanizadas++;
                        } else if(pieza.material == "Titanio"){
                         pulidas++;
                         
                        } else {
                         pintados++;
                        
                        }
    		}
    	}
        var texto = "<p>" + "La factoría ha fabricado " + (pElectricas+pMecanicas) + " de las cuales " +pElectricas+" son de tipo eléctrico y "+pMecanicas+" son de tipo mecánico. " + "</p>" +
        "<p>" + "De las eléctricas, la estación de tratamiento ha aplicado barniz normal a "+ bNormal +" y ha aplicado barniz especial a "+ bEspecial +"." + "</p>" +
        "<p>" + "De las mecánicas ha galvanizado "+ galvanizadas +", ha pintado "+ pintados +" y ha pulido "+ pulidas +"" + "</p>" ;
    	console.log(texto);
        
        document.getElementById("resultado").innerHTML = texto;
        }

        class Fabrica
        {
            constructor()
            {
                var Fac = new Factoria();
                var Pros = new EstacionDeTratamiento();
                var piezas = [];
            }
        fabricar(turnos)
        {
        	let pieza = null;
            var Fac = new Factoria();
            var Pros = new EstacionDeTratamiento();
            var piezas = [];
            for(var i = 0; i < turnos; i++)
            {
              
                pieza = Fac.generarPieza();
                pieza = Pros.procesarPieza(pieza);
                piezas.push(pieza);
                    
            }
            return piezas;
        }

        }

        class Factoria 
        {
            generarPieza()
            {
            	var pieza = null;
                let tipo = getRandomInt(10);
                if(tipo<3)
                {
                    var pieza = new PiezaElectrica(getRandomInt(5),getRandomInt(4),getRandomInt(4), makeCode("E") , Date(),null);

                } else {

                    var pieza = new PiezaMecanica(getRandomInt(5),getRandomInt(3), makeCode("M") ,Date(),null);
                }
                return pieza;
            }
        }

        class EstacionDeTratamiento 
        {
         procesarPieza(pieza)
            {
                let tratamiento = null;
                if(pieza instanceof PiezaElectrica )
                {
                    if(pieza.potencia == 1 || pieza.potencia == 5)
                        {
                         tratamiento = "Barnizada Normal";
                       
                        } else {
                         tratamiento = "Barnizada Especial";
                         
                        }
                } else {
                    if(pieza.material == "Acero")
                        {
                         tratamiento = "Galvanizada";
                         
                        } else if(pieza.material == "Titanio"){
                         tratamiento = "Pulida";
                         
                        } else {
                         tratamiento = "Pintada";
                        
                        }
                     }
                pieza.procesamiento = tratamiento;

                return pieza;
            } 
        }

        function makeCode(letter)
        {
            let Alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
            let temp = getRandomInt(10000000000) + 10000000000;
            if(temp > 100000000000){Math.floor(temp/10)}
            temp = temp + Alphabet[getRandomInt(26)] +letter;

            return temp;
        }

        function getRandomInt(max)
        {
            return Math.floor(Math.random() * max);
        }

        class Pieza
        {
             constructor(code,date,procesamiento)
             {
                this.code = code;
                this.date = date;
                this.procesamiento = procesamiento;
             }
             get GetCode()
             {
                return this._code;
             }
             get GetDate()
             {
                return this._date;
             }
             set SetCode(newCode)
             {
               this._code;
             }
             set SetDate(newDate)
             {
                this._date = newDate;
             }
                set SetPros(newprocesamiento)
            {
               this._procesamiento = newprocesamiento;
            }
            get GetPros()
            {
              return this._procesamiento;
            }
        }

        class PiezaElectrica extends Pieza 
        {
            constructor(name, potencia, voltage, code, date, procesamiento)
            {
                super(code,date,procesamiento);
                this.SetPotencia(potencia);
                this.SetVoltage(voltage);
                this.SetName(name);
            }

            get GetPotencia()
            {
                return this.potencia;
            }
            SetPotencia(newPotencia)
            {
                let Pot = [1,5,10,20];
                this.potencia = Pot[newPotencia];
            }
            get GetVoltage()
            {
                return this.Voltage;
            }
            SetVoltage(newVoltage)
            {
                let Vol = [3.3,5,12,240];
                this.Voltage = Vol[newVoltage];
            }
            get GetName()
            {
                return this.name;
            }
            SetName(newName)
            {
                let Name = ["Placa Abs","Centralita encendido", "Bornes cableado","Alternador","Encendido"];
                this.name = Name[newName];
            }
        }

        class PiezaMecanica extends Pieza 
        {
            constructor(name, material, code, date, procesamiento)
            {
                super(code,date,procesamiento);
                this.SetMaterial(material);
                this.SetName(name);
            }
            get GetMaterial()
            {
                return this.material;
            }
            SetMaterial(newMaterial)
            {
                let Mat = ["Acero","Titanio","Carbono"];

                this.material = Mat[newMaterial];
            }
            get GetName()
            {
                return this.name;
            }
            SetName(newName)
            {
                let Name = ["Larguero Inferior","Guardabarros", "Larguero Superior","Subchasis","Puerta"];
                this.name = Name[newName];
            }
        }