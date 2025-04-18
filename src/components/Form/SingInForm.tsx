import React from "react";
import "./SingInForm.css";

function SingInForm()
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
      className="SingInForm"
      >
         <h1
         className="SingInFormHeading"
         >
            Sing In
         </h1>

         <label
         htmlFor="SingInFormEmailInput"
         className="SingInFormEmailInputLabel"
         >
            Email
         </label>
         
         <input
         id="SingInFormEmailInput"
         className="SingInFormEmailInput"
         type="email"
         value={email}
         onChange={handleEmailInput}
         />


         <label
         htmlFor="SingInFormPasswordInput"
         className="SingInFormPasswordInputLabel"
         >
            Password
         </label>

         <input
         id="SingInFormPasswordInput"
         className="SingInFormPasswordInput"
         type="password"
         value={password}
         onChange={handlePasswordInput}
         />


         <button
         type="submit"
         className="SingInFormSubmitButton"
         disabled={submitButtonIsDisabled}
         >
            LogIn
         </button>
      </form>
   );
}

export default SingInForm;