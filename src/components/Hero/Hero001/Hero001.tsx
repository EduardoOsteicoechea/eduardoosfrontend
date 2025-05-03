import "./Hero001.css"

function Hero001() {

  return (
    <div className="Hero001">
      <div className="ImageContainer">
        <img src="/personal_photo_no_background_1920x1920.png" alt="Profile Photo" height="100%" />
      </div>

      <div className="CurrentViewerPanel">
        Current Viewer
      </div>

      <div className="OptionsDashboardContainerPanel">
        <h1>
          Multitask Role
        </h1>
      </div>

      <button className="OptionsDashboardActionButton" type="button">
        Let's Talk
      </button>

      <div className="OptionsDashboardContainer">
        <button className="OptionsDashboard-FacetButton">
          <img src="/brand/icon_ai.svg" alt="ai icon" height="100%" />
        </button>
        <button className="OptionsDashboard-FacetButton">
          <img src="/brand/icon_chart.svg" alt="ai icon" height="100%" />
        </button>
        <button className="OptionsDashboard-FacetButton">
          <img src="/brand/icon_tag_block.svg" alt="ai icon" height="100%" />
        </button>
        <button className="OptionsDashboard-FacetButton">
          <img src="/brand/icon_advancement_dashboard.svg" alt="ai icon" height="100%" />
        </button>
        <button className="OptionsDashboard-FacetButton">
          <img src="/brand/icon_global.svg" alt="ai icon" height="100%" />
        </button>
        <button className="OptionsDashboard-FacetButton">
          <img src="/brand/icon_time_line.svg" alt="ai icon" height="100%" />
        </button>
        <button className="OptionsDashboard-FacetButton">
          <img src="/brand/icon_text_view.svg" alt="ai icon" height="100%" />
        </button>
        <button className="OptionsDashboard-FacetButton">
          <img src="/brand/icon_images.svg" alt="ai icon" height="100%" />
        </button>
        <button className="OptionsDashboard-FacetButton">
          <img src="/brand/icon_apps.svg" alt="ai icon" height="100%" />
        </button>
        <button className="OptionsDashboard-FacetButton">
          <img src="/brand/icon_global.svg" alt="ai icon" height="100%" />
        </button>
        <button className="OptionsDashboard-FacetButton">
          <img src="/brand/icon_images.svg" alt="ai icon" height="100%" />
        </button>
        <button className="OptionsDashboard-FacetButton">
          <img src="/brand/icon_ai.svg" alt="ai icon" height="100%" />
        </button>
      </div>
    </div>
  )
}

export default Hero001