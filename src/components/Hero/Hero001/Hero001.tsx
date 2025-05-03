import "./Hero001.css"

function Hero001() {

  return (
    <div className="Hero001">
      <div className="ImageContainer">
        <img src="/personal_photo_no_background_1920x1920.png" alt="Profile Photo" height="100%" />
      </div>
      <div className="CurrentViewerPanel"></div>
      <div className="OptionsDashboardBorder">
        <div className="OptionsDashboardContainer">
          <button className="OptionsDashboard-FacetButton">
            <img src="/brand/icon_ai.svg" alt="ai icon" height="100%" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero001