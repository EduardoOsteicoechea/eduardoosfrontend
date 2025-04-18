import React from "react";
import "./LogInForm.css";

function LogInForm()
{
   const [email, setEmail] = React.useState("");
   const [password, setPassword] = React.useState("");
   const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = React.useState(true);

   const handleSubmit = (event: React.FormEvent) =>
   {
      event.preventDefault();
      const formData :FormData = new FormData();
      formData.append("email",email);
      formData.append("password",password);

      console.log("Form Data Entries:");
      
      for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]); // key, value
      }

      alert("Form Submitted");
   };

   const handleEmailInput = (event:any) =>
   {
      setEmail(event.target.value);
   };

   const handlePasswordInput = (event:any) =>
   {
      setPassword(event.target.value);
   };

   React.useEffect(()=>{
      setSubmitButtonIsDisabled((email === "" || password === ""));
   },[email,password])

   return (
      <form
      onSubmit={handleSubmit}
      className="LogInForm"
      >
         <h1
         className="LogInFormHeading"
         >
            Log In
         </h1>

         <label
         htmlFor="LogInFormEmailInput"
         className="LogInFormEmailInputLabel"
         >
            Email
         </label>
         
         <input
         id="LogInFormEmailInput"
         className="LogInFormEmailInput"
         type="email"
         value={email}
         onChange={handleEmailInput}
         />


         <label
         htmlFor="LogInFormPasswordInput"
         className="LogInFormPasswordInputLabel"
         >
            Password
         </label>

         <input
         id="LogInFormPasswordInput"
         className="LogInFormPasswordInput"
         type="password"
         value={password}
         onChange={handlePasswordInput}
         />


         <button
         type="submit"
         className="LogInFormSubmitButton"
         disabled={submitButtonIsDisabled}
         >
            LogIn
         </button>
      </form>
   );
}

export default LogInForm;