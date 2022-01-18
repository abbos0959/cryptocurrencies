import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setcrptos] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  

  useEffect(() => {
    setcrptos(cryptoList?.data?.coins);
    const filterData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(SearchTerm.toLocaleLowerCase())
    );
    setcrptos(filterData);
  }, [SearchTerm, cryptoList]);
  if (isFetching) return "Loading...";  

  return (
    <>
    {!simplified &&  <div className="search-crypto">
        <Input
          value={SearchTerm}
          placeholder="search crypto"
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>}
     
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}.${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p> Price: {millify(currency.price)} </p>
                <p> Market: {millify(currency.marketCap)} </p>
                <p> Daily Change: {millify(currency.change)}% </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Cryptocurrencies;
