
///-----------------------Fct of preduction
function Predict()
{
     if(document.getElementById("gilbert").checked == true)
    {

        var a=document.getElementById("a").value;
        var b=document.getElementById("b").value;
        var diameter=document.getElementById("Diameter").value;
        var db_Gas=document.getElementById("Debit Gas").value;
        var db_water=document.getElementById("Debit Water").value;
        var db_date=document.getElementById("dbdate");
        var fndate=document.getElementById("fndate")


        //Recuperation des donnée

 
        //Lancer gilbert modele avec ces parametres



        //Affichage des données 
         //1 sous form table 
         // Schema=["Date","pression_pipe","pression_tete","diametre","temperature"];
         // Create_table(Schema,data,"tbody_predicted")


    }
    else{
        if (document.getElementById("lstm").checked == true) {
            
            var db_date=document.getElementById("dbdate").value;
            var fndate=document.getElementById("fndate").value;
            var modelName=document.getElementById("ModeleName").value;


             //Recuperation des donnée



             //Appelle Model
            

             //Affichage des données
             //1 sous form table 
            // Schema=["Date","pression_pipe","pression_tete","diametre","temperature"];

            // Create_table(Schema,data,"tbody_predicted")


            
        } else {
            if (document.getElementById("ann").checked == true) {
                var db_date=document.getElementById("dbdate").value;
                var fndate=document.getElementById("fndate").value;
                var modelName=document.getElementById("ModeleName").value;

                 //Recuperation des donnée



                //Appelle Model



                //Affichage des données 
                //1 sous form table 
               // Schema=["Date","pression_pipe","pression_tete","diametre","temperature"];

                // Create_table(Schema,data,"tbody_predicted")

                
            } else {
                alert("Selcte Model Type....")
                
            }
        }



    }
    

}