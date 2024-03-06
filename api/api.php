
<?php 

		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

       if ($_SERVER['REQUEST_METHOD'] === 'POST') {
			// this is called by the LP - not React
           function get_data() {
               //$name = $_POST['name'];
               ///$file_name='users'. '.json';
			      // Set filename according if its development or production
               $url= $_SERVER['HTTP_HOST']; 
               $url.= $_SERVER['REQUEST_URI']; 
               // Add random hash to file name
               //$rand_safix =  rand(101, 999); 
               if (strpos($url, 'localhost') === false ){
                 $file_name = '../build/users' . '.json';
               }else{
                  $file_name = '../public/users' .'.json';
               }
               
               // remove 2 first array variables: id and hebrew  name 
               //////$shifted_variable = array_shift($_POST);
               //////$shifted_variable = array_shift($_POST);
               //////$form_fields_array = $_POST;               

               if(file_exists("$file_name")) { 
               $shifted_variable = array_shift($_POST);
               $shifted_variable = array_shift($_POST);
			   // the following is probbaly for 'first-line-exists' which is not used any more
               /////$shifted_variable = array_shift($_POST);			   
               $form_fields_array = $_POST;  
               $current_data=file_get_contents("$file_name");
                   $array_data=json_decode($current_data, true);

                   $extra = $form_fields_array;
                   $array_data[]=$extra;
                   //echo 'success';
                   return json_encode($array_data);
               }
               else { // File not exist
                  $form_fields_array = $_POST;  
                  $datae=array();
                  $datae[] = $form_fields_array;

                   echo "file not exist<br/>";
                   return json_encode($datae);   
               }
           } // function get_data() {
         
           ///$file_name='users'. '.json';
		   // Set filename according if its development or production
		   
		   // if POST came from landing page ajax
		   if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && ($_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest')) {          
               $url= $_SERVER['HTTP_HOST']; 
               $url.= $_SERVER['REQUEST_URI'];   
				   if (strpos($url, 'localhost') === false ){
					 $file_name = '../build/users' . '.json';
				   }else{
					  $file_name = '../public/users' . '.json';
				   }
               // Call the actuall function get_data() 
				   if(file_put_contents("$file_name", get_data())) {
                  if ($_POST['name'] == 'sim'){
                     unlink('../public/users.json');
                     copy('../public/usersSimulate.json','../public/users.json');
                  }
					   echo 'success';
				   }                
				   else {
					   echo 'There is some error';                
				   }
		   } //
         else{ // if sent from REACT (in all cases - both for regsiter account Modal and for deleting users lines          
            $data = json_decode(file_get_contents('php://input'), true);
            // first find who sent it:                
            // 1. or a env.ini sent from AccountModal after user saving
            // 2. is it a simple save after deleting some useres
            //$first_array_keys=NULL;
            //if (isset(array_keys($data[0]))){
            //  $first_array_keys = array_keys($data[0]);
            //}
           //// $first_array_keys = array_keys($data[0]);
           // its undefined for env.ini so !isset()
           // for deleting lines we skip that and arrive their apropriatly
           ///// if (!isset($first_array_keys)){
           // the above code caused always an error

           // in case of env.ini or anr POST from REACT it must be 3
           // in case of simple save users after deleting it must be more
           // since includes form id, form name and at list fields of one user
              //$ss = array_key_first($data[0]);
              // if ((count($data) === 3)){                 
              // this works better even if left exactly 3 users
              // $array_type = $data["0"]['react_post_type'];

              ///!! if (!array_key_exists("0",$data)) {
               if ($data["0"]['react_post_type'] === "LOGIN"){ 
                  // first get reid of the the first object {react_post_type: "REGISTRATION"}
                  $data = array_slice($data,1);

                  $url= $_SERVER['HTTP_HOST']; 
                  $url.= $_SERVER['REQUEST_URI']; 
                  // remove the first item from array 
                  ///array_shift($data);
                  if (strpos($url, 'localhost') === false ){
                     // save data files in build enviroment
                     //file_put_contents('../build/env.json', json_encode($data));
                     $env_json = file_get_contents('../build/env.json');
                     $env_array = json_decode($env_json, true); 
                     if ($data === $env_array){
                        $token = uniqid();
                        // save token in server (same token for all users)
                        file_put_contents('../build/token.json', json_encode($token));
                        echo $token;
                     } 
                     else{
                        echo "bad";
                     }
                  }else{ 
                     $env_json = file_get_contents('../public/.env');
                     $env_array = json_decode($env_json, true);
                     // compare login to env
                     if (($data[0]['LOGIN'] === $env_array[0]['LOGIN']) &&
                           ($data[1]['PASSWORD'] === $env_array[0]['PASSWORD']))
                     {
                        // check if there is a token in .env. If exits-> send to this user
                        // if not => create, save in .env and also send to user

                        if (strlen($env_array[0]['JWT_SECRET']) > 10){
                           echo $env_array[0]['JWT_SECRET'];
                           return;
                        }
                        else{
                           $token = uniqid();
                           // save token in server (same token for all users)
                           $env_array[0]['JWT_SECRET'] = $token;
                           file_put_contents('../public/token.json', json_encode($env_array));
                           echo $$env_array[0]['JWT_SECRET'];
                           return;
                        }
                        
                        
                     } 
                     else{
                        $env_array[0]['JWT_SECRET'] = '123';
                        echo $env_array[0]['JWT_SECRET'];
                        return;
                     }
                  }
                  // return token the fetch from ModalAccount.js 

               } // if ($data["0"]['react_post_type'] === "LOGIN"){
                  
               if ($data["0"]['react_post_type'] !== "USERS"){
                    if (array_key_first($data) === "ACCOUNT")
                    {
                       $url= $_SERVER['HTTP_HOST']; 
                       $url.= $_SERVER['REQUEST_URI'];
                       // remove the first item from array 
                       array_shift($data);
                       if (strpos($url, 'localhost') === false ){
                          // save data files in build enviroment
                          file_put_contents('../build/env.json', json_encode($data));
                          // create token, save it and send it to client for future requests
                    
                       }else{ 
                          // save data files in local host
                          file_put_contents('../public/env.json', json_encode($data));
                          // create token, save it and send it to client for future requests
                       }
                       // return token the fetch from ModalAccount.js 
                    } //   if (array_key_first($data) === "ACCOUNT")      
                    else if (array_key_first($data) === "LOGIN")
                    {
                    }         
                    else if (array_key_first($data) === "KEY1")
                    {
                       $url= $_SERVER['HTTP_HOST']; 
                       $url.= $_SERVER['REQUEST_URI']; 
                       // remove the first item from array 
                       array_shift($data);
                       // remove the second item
                       array_shift($data);
                       if (strpos($url, 'localhost') === false ){
                         
                          $env_json = file_get_contents('../build/env.json');
                          $login_array = json_decode($env_json, true); 
                    
                       }else{ 
                          $token_json = file_get_contents('../public/token.json');
                          $token_array = json_decode($token_json, true);
                          // compare login to env
                          if ($data['TOKEN'] === $token_array){
                           
                             echo "TOKEN-OK";
                          } 
                          else{
                             echo "bad";
                          }
                       }
                       // return token the fetch from ModalAccount.js 
                    }         


                    //echo $token;              
                   return; // get out here if its env.ini
                 } // if ($data["0"]['react_post_type'] !== "USERS"){
                  
                 // arrive here if its "USERS": simple save after deleting some users
                 else if ($data["0"]['react_post_type'] === "USERS"){

                 // first get reid of the the first object {react_post_type: "USERS"}
                 $data = array_slice($data,1);
                 // 2. is it a simple save after deleting some useres  
                 $first_array_keys = array_keys($data[0]);
                 // delete first 2 keys: form_id and form_name keys
                 $form_fields_array = array_slice($first_array_keys, 2);
                 $url= $_SERVER['HTTP_HOST']; 
                 $url.= $_SERVER['REQUEST_URI'];   
              if (strpos($url, 'localhost') === false ){                     
                    // check if not all users wrere deleted
                    if (count($form_fields_array) > 0){
                       // save data files in local host
                    file_put_contents('../build/users.json', json_encode($data));
                    // save form-fileld-file if not exists
                    if (!file_exists('../build/FormFields.json')) {
                       file_put_contents('../build/FormFields.json', json_encode($form_fields_array));
                    }
                    } else{
                       // if all users deleted then dlete also users.json
                       unlink('../build/users.json');
                       unlink('../build/FormFields.json');
                    }
              }else{ 
                 // check if not all users wrere deleted
                 if (count($form_fields_array) > 0){
                       // save data files in local host
                       file_put_contents('../public/users.json', json_encode($data));
                       // save form-fileld-file if not exists
                       if (!file_exists('../public/FormFields.json')) {
                          file_put_contents('../public/FormFields.json', json_encode($form_fields_array));
                       }
                 } else{
                          // if all users deleted then dlete also users.json
                          unlink('../public/users.json');
                          unlink('../public/FormFields.json');
                 }
                 }
              
              
              echo 'Data saved successfully!';	
              } // if ($data["0"]['react_post_type'] === "USERS"){ 
     } // if sent from REACT (in all cases - both for regsiter account Modal and for deleting users lines        

   } // if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
         $url= $_SERVER['HTTP_HOST']; 
           $url.= $_SERVER['REQUEST_URI']; 
           // Add random hash to file name
           //$rand_safix =  rand(101, 999); 
           if (strpos($url, 'localhost') === false ){
             $file_name = '../build/env' . '.json';
           }else{
              $file_name = '../public/env' . '.json';
           }
        if(file_exists("$file_name")) { 
         echo "ENV.JSON-EXISTS";
        }
        else {
         echo "ENV.JSON-MISSING";  
        }
  }
      