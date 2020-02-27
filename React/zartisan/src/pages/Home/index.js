/**
 * Imports of dependencies
 */
import React, { useState } from "react";
import { Row } from "antd";
/**
 * Local imports
 */
import "./style.sass";
import FranceMap from "../../components/FranceMap";
import ButtonSearchArtisanList from "src/components/ButtonSearchArtisanList";
import ButtonJob from "../../components/ButtonJob";
import ButtonRegion from "../../components/ButtonRegion";

/**
 * Code
 */

const Home = () => {
  const [visibleButtonJobs, setvisibleButtonJobs] = useState(false);
  const [regionChange, setRegion] = useState("Choisissez une Région");
  const [jobChange, setJobChange] = useState("Choisissez votre métier");
  const [idJob, setIdJob] = useState("");

  return (
    <div className="home">
      <Row
        className="home-content-button"
        type="flex"
        justify="space-around"
        align="middle"
      >
        <Row
          type="flex"
          className="home-button-dropdown"
          justify="space-around"
          align="middle"
        >
          <ButtonRegion
            regionChange={regionChange}
            setRegion={setRegion}
            visibleButtonJobs={visibleButtonJobs}
            setvisibleButtonJobs={setvisibleButtonJobs}
          />
        </Row>

        <Row
          type="flex"
          justify="space-around"
          align="middle"
          className="home-button-dropdown"
        >
          <ButtonJob
            jobChange={jobChange}
            setJobChange={setJobChange}
            setIdJob={setIdJob}
            visibleButtonJobs={visibleButtonJobs}
            setvisibleButtonJobs={setvisibleButtonJobs}
          />
        </Row>
      </Row>

      <Row
        type="flex"
        justify="space-around"
        align="middle"
        className="home-france"
      >
        <FranceMap
          setvisibleButtonJobs={setvisibleButtonJobs}
          setRegion={setRegion}
          regionChange={regionChange}
        />
        <ButtonSearchArtisanList regionChange={regionChange} idJob={idJob} />
      </Row>
    </div>
  );
};

export default Home;
