import React from "react";
import "./Chat001.css"
import StaticJsonDataDisplayer001 from "./StaticJsonDataDisplayer001";

function Chat001(){
   const [chatStaticContent,setchatStaticContent] = React.useState<string[]>();

   return(
     
         <StaticJsonDataDisplayer001 url="static_data/home_profile_presentation.json"/>
      
   )
}

export default Chat001