

const CheckValidation = (values) => {
    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };
  let error={
    name:'',
    email:"",
    password:""
  };
   switch(true){ 
    case values.name=='':
       error.name="user name can't be empty";
       break;
    case values.name.length<5:
        error.name="username length should be atleast 5 charecters"; 
        break;
    case values.email=='':
        error.email="email can't be empty";
        break;  
   case (validateEmail(values.email)==null):
            error.email="invalid email format";
            break; 
    case values.password=='':
        error.password="password can't be empty";
        break; 
    case values.password.length<8 :
        error.password="password length should be 8 charecters";
        break;  
    default:
        error.name=''    
        error.email=''
        error.password=''
      break;  
   }

   return error
}

export default CheckValidation
