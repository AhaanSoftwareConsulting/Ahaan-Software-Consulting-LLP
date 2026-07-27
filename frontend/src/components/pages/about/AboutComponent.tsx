import { AboutBanner } from "./components/AboutBanner"
import { AboutContent } from "./components/AboutContent"
import { AboutSection } from "./components/AboutSection"
import { AboutVideo } from "./components/AboutVideo"
import { Showcase } from "./components/Showcase"
import { Team } from "./components/Team"
import { Timeline } from "./components/Timeline"


export const AboutComponent = () => {
  return (
    <div>
      <AboutBanner/>
      <AboutContent/>
      <Timeline/>
      <AboutVideo/>
      <AboutSection/>
      <Showcase/>
      <Team/>
    </div>
  )
}
