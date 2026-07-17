import { BusinessCard } from "./components/BusinessCard"
import { CaseStudies } from "./components/CaseStudies"
import { OurClients } from "./components/OurClients"
import { OurProcess } from "./components/OurProcess"
import { OurTechnology } from "./components/OurTechnology"
import {ServicesSection} from "./components/ServiceSection"
import { TotalProject } from "./components/TotalProject"
import { WhyChooseUs } from "./components/WhyChooseUs"

export const HomeComponent = () => {
  return (
    <div>
      <ServicesSection/>
      <OurTechnology/>
      <WhyChooseUs/>
      <BusinessCard/>
      <OurProcess/>
      <CaseStudies/>
      <TotalProject/>
      <OurClients/>
    </div>
  )
}
