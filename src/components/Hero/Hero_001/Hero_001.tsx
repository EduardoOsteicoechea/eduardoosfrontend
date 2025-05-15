import Chatbot_001 from "../../Chatbot/Chatbot_001/Chatbot_001"
import Sidebar_002 from "../../Sidebar/Sidebar_002/Sidebar_002"
import "./Hero_001.css"

function Hero_001() {

  return (
    <div className="Hero_001">
      <div className="personal_photo_container">
        <img className="personal_photo_container_image" src="/personal_photo_no_background_1920x1920.png" alt="Profile Photo" height="100%" />
      </div>
      
      <div className="current_viewer_panel">
        <Chatbot_001/>
      </div>

      <div className="hero_heading_container">
        <h1 className="hero_heading_container_heading">
          Ethical Thinker - BIM Architect - Fullstack Software Developer
        </h1>
      </div>
      
      <button className="ui_options_dashboard_action_button" type="button">
        Let's Talk
      </button>
      
      <div className="ui_options_dashboard_container">
        <button className="ui_options_facet_button">
          <img src="/brand/icon_ai.svg" alt="ai icon" height="100%" />
        </button>
        <button className="ui_options_facet_button">
          <img src="/brand/icon_chart.svg" alt="ai icon" height="100%" />
        </button>
        <button className="ui_options_facet_button">
          <img src="/brand/icon_tag_block.svg" alt="ai icon" height="100%" />
        </button>
        <button className="ui_options_facet_button">
          <img src="/brand/icon_advancement_dashboard.svg" alt="ai icon" height="100%" />
        </button>
        <button className="ui_options_facet_button">
          <img src="/brand/icon_global.svg" alt="ai icon" height="100%" />
        </button>
        <button className="ui_options_facet_button">
          <img src="/brand/icon_time_line.svg" alt="ai icon" height="100%" />
        </button>
        <button className="ui_options_facet_button">
          <img src="/brand/icon_text_view.svg" alt="ai icon" height="100%" />
        </button>
        <button className="ui_options_facet_button">
          <img src="/brand/icon_images.svg" alt="ai icon" height="100%" />
        </button>
        <button className="ui_options_facet_button">
          <img src="/brand/icon_apps.svg" alt="ai icon" height="100%" />
        </button>
        <button className="ui_options_facet_button">
          <img src="/brand/icon_global.svg" alt="ai icon" height="100%" />
        </button>
        <button className="ui_options_facet_button">
          <img src="/brand/icon_images.svg" alt="ai icon" height="100%" />
        </button>
        <button className="ui_options_facet_button">
          <img src="/brand/icon_ai.svg" alt="ai icon" height="100%" />
        </button>
      </div>      

      <Sidebar_002 grid_row="2" grid_row_span="3" grid_column="6" grid_column_span="1"/>

    </div>
  )
}

export default Hero_001