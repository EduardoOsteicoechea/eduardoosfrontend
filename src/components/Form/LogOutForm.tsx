import React from "react";
import "./LogOutForm.css";

function LogOutForm()
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
      className="LogOutForm"
      >
         <h1
         className="LogOutFormHeading"
         >
            Log Out
         </h1>

         <label
         htmlFor="LogOutFormEmailInput"
         className="LogOutFormEmailInputLabel"
         >
            Email
         </label>
         
         <input
         id="LogOutFormEmailInput"
         className="LogOutFormEmailInput"
         type="email"
         value={email}
         onChange={handleEmailInput}
         />


         <label
         htmlFor="LogOutFormPasswordInput"
         className="LogOutFormPasswordInputLabel"
         >
            Password
         </label>

         <input
         id="LogOutFormPasswordInput"
         className="LogOutFormPasswordInput"
         type="password"
         value={password}
         onChange={handlePasswordInput}
         />


         <button
         type="submit"
         className="LogOutFormSubmitButton"
         disabled={submitButtonIsDisabled}
         >
            LogIn
         </button>
      </form>
   );
}

export default LogOutForm;