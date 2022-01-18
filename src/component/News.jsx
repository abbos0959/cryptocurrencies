import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";


const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const { data} = useGetCryptosQuery(100);

    const [newsCategory,setnewsCategory]=useState("Cryptocurrency")
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 10 : 100,
  });
  console.log(cryptoNews);
  if (!cryptoNews?.value) return "Loading...";
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="select a news Crypto"
            optionFilterProp="children"
            onChange={(value)=>setnewsCategory(value)}
            filterOption={(input,option)=> option.children.toLowerCase().indexOf(input.toLowerCase()>0)}

          >

              <Option value="Cryptocurrency"> Cryptocurrency</Option>
              {data?.data?.coins.map((coin)=><Option value={coin.name}> {coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title " level={4}>
                  {news.name}
                </Title>
                <img src={news?.image?.thumbnail?.contentUrl} />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={news.provider[0]?.image?.thumbnail?.contentUrl}
                    alt="news"
                  />
                  <Text>
                    {" "}
                    {moment(news.datePublished).startOf("abbos").fromNow()}
                  </Text>
                </div>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default News;
