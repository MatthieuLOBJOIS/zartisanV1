//Imports of dependencies
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { Row, List, Rate } from "antd";
import slugify from "slugify";
import { Helmet } from "react-helmet";

//Local imports
import { NAME_SERVER } from "src/store/register/actions";
import { artisanData } from "src/store/artisan/actions";
import { useLoading } from "src/hooks/useLoading";
import "./style.sass";

//Components
import ButtonSearchArtisanList from "src/components/ButtonSearchArtisanList";
import ButtonJob from "../../components/ButtonJob";
import ButtonRegion from "../../components/ButtonRegion";
import Loader from "src/components/Loader";

//Components content of page list-artisan
const ListArtisan = () => {
  //Hooks
  let toLoading = useLoading();
  const dispatch = useDispatch();
  const arrayArtisan = useSelector(state => state.search);

  const [visibleButtonJobs, setvisibleButtonJobs] = useState(false);
  const [regionChange, setRegion] = useState("Choisissez une Région");
  const [jobChange, setJobChange] = useState("Choisissez votre métier");
  const [idJob, setIdJob] = useState("");
  const [star, setStar] = useState(1);
  const [sessionData, setSessionData] = useState(null);
  useEffect(
    () => {
      setSessionData(JSON.parse(localStorage.getItem("ListArtisan")));
    },
    [arrayArtisan]
  );

  let objectArtisan = "";

  const listData = [];

  //Loop the different artisan of the search
  if (sessionData != null) {
    sessionData.map(obj => {
      if (obj.companyDescription == null) {
        obj.companyDescription = "";
      }
      objectArtisan = obj;
      listData.push(objectArtisan);
    });
  }

  useEffect(
    () => {
      setStar(objectArtisan.averageRate);
    },
    [objectArtisan.averageRate]
  );

  const RateStar = () => {
    return <Rate style={{ fontSize: "1em" }} disabled defaultValue={star} />;
  };

  //Redirect to page-artisan
  const LinkArtisan = withRouter(({ history, item }) => {
    const handleSearch = () => {
      dispatch(artisanData(item.id, item.email));

      history.push(
        `/page-artisan/${slugify(item.company, {
          lower: true
        })}`
      );
    };
    return <a onClick={handleSearch}>{item.company}</a>;
  });

  return (
    <div>
      <Helmet>
        <title>Z'Artisan - Liste d'artisans</title>
      </Helmet>
      <Row type="flex" justify="space-around" align="middle">
        {toLoading === false ? (
          <div className="list-artisan-content">
            <div align="middle">
              <ButtonRegion
                regionChange={regionChange}
                setRegion={setRegion}
                visibleButtonJobs={visibleButtonJobs}
                setvisibleButtonJobs={setvisibleButtonJobs}
              />

              <ButtonJob
                jobChange={jobChange}
                setJobChange={setJobChange}
                setIdJob={setIdJob}
                visibleButtonJobs={visibleButtonJobs}
                setvisibleButtonJobs={setvisibleButtonJobs}
              />

              <div className="bloc-button-search-artisan">
                <ButtonSearchArtisanList
                  regionChange={regionChange}
                  idJob={idJob}
                />
              </div>
            </div>

            <List
              itemLayout="horizontal"
              size="small"
              pagination={{
                onChange: page => {},
                pageSize: 5
              }}
              grid={{
                gutter: 16
              }}
              dataSource={listData}
              renderItem={item => (
                <List.Item className="antListItem">
                  <List.Item.Meta
                    className="ant-list-item "
                    avatar={
                      <img
                        style={{ width: "60px" }}
                        src={`${NAME_SERVER}/${item.picture}`}
                      />
                    }
                    title={<LinkArtisan item={item} />}
                    description={item.companyDescription}
                  />
                  <RateStar />
                </List.Item>
              )}
            />
          </div>
        ) : (
          <Loader />
        )}
      </Row>
    </div>
  );
};
export default ListArtisan;
