var db=null;
    document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady(){
            console.log("device is ready");
            db = window.sqlitePlugin.openDatabase({name: "bdciudades.db", createFromLocation: 1});
            if(db!=null){
                listarTodasCiudades();
            }
            else{
                console.log("error al abrir bd");
            }
        }
        function listarTodasCiudades(){
            db.transaction(listar,error); 	 	 	
        }
        function listar(tx){
            tx.executeSql("Select * from ciudad",[],function(tx,result){
                var nciu=result.rows.length;
                var html="";
                console.log("num ciudades="+nciu);
                if(nciu>0){
                    for(var i=0; i<nciu; i++){
                        var fila=result.rows.item(i);
                        html+="<div sytle='background-color: yellow; font-weight:bold;'>"+fila['descripcion']+"</div>";
                    }
                    $('#contenido').html(html);
                }
                else{
                    console.log("no hay datos");
                }
            });
        }
        function error(err){
            console.log("error ="+err.message);
        }
