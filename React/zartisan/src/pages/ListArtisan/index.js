import React, { useState, useEffect } from "react";
import { Row, List, Rate } from "antd";

import "antd/dist/antd.css";
import "./style.sass";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { artisanData } from "src/store/artisan/actions";
import { NAME_SERVER } from "src/store/register/actions";

/**
 * Local imports
 */

import ButtonSearchArtisanList from "src/components/ButtonSearchArtisanList";
import ButtonJob from "../../components/ButtonJob";
import ButtonRegion from "../../components/ButtonRegion";
import Loader from "src/components/Loader";

const ListArtisan = () => {
  const dispatch = useDispatch();
  const artisandata = useSelector(state => state.search);
  const [visibleButtonJobs, setvisibleButtonJobs] = useState(false);
  const [regionChange, setRegion] = useState("Choisissez une Région");
  const [jobChange, setJobChange] = useState("Choisissez votre métier");
  const [idJob, setIdJob] = useState("");
  const [star, setStar] = useState(1);
  const [loading, setLoading] = useState(true);
  console.log("test", artisandata);
  let objectArtisan = "";
  const listData = [];

  let arrayArtisan = [];
  for (let data in artisandata) {
    arrayArtisan = artisandata[data];
  }

  for (let d in arrayArtisan) {
    if (arrayArtisan[d].companyDescription == null) {
      arrayArtisan[d].companyDescription = "";
    }

    objectArtisan = arrayArtisan[d];

    listData.push(objectArtisan);
  }

  useEffect(() => {
    setStar(objectArtisan.averageRate);
  }, [objectArtisan.averageRate]);

  const RateStar = () => {
    return <Rate style={{ fontSize: "1em" }} disabled defaultValue={star} />;
  };

  const LinkArtisan = withRouter(({ history, item }) => {
    const handleSearch = () => {
      dispatch(artisanData(item.id, item.email));
      //console.log('itemtest', item.id, item.email, item);
      {
        "item compagny", item.company;
      }

      history.push(`/page-artisan/${item.company}`);
    };
    return <a onClick={handleSearch}>{item.company}</a>;
  });

  return (
    <div>
      <Row type="flex" justify="space-around" align="middle">
        {artisandata != "" ? (
          <div className="list-artisan-content">
            <Row type="flex" justify="space-around" align="middle">
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
            </Row>

            <List
              itemLayout="horizontal"
              size="small"
              pagination={{
                onChange: page => {
                  //console.log(page);
                },
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
