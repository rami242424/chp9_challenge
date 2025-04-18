import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

interface PriceData {
  quotes: {
    USD: {
      price: number;
      ath_price: number;
      percent_from_price_ath: number;
      percent_change_1h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_30d: number;
    };
  };
}

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

function Price() {
  const { coinId } = useParams<{ coinId: string }>();
  const { isLoading, data } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId)
  );

  const usd = data?.quotes.USD;

  const lowestPrice = usd
    ? usd.ath_price * (1 + usd.percent_from_price_ath / 100)
    : 0;

  return isLoading ? (
    <Loader>Loading Price Info...</Loader>
  ) : (
    <Overview>
      <OverviewItem>
        <span>💰 현재 가격</span>
        <span>${usd?.price.toFixed(2)}</span>
      </OverviewItem>
      <OverviewItem>
        <span>📈 고가 (ATH)</span>
        <span>${usd?.ath_price.toFixed(2)}</span>
      </OverviewItem>
      <OverviewItem>
        <span>📉 저가 (계산값)</span>
        <span>${lowestPrice.toFixed(2)}</span>
      </OverviewItem>
      <OverviewItem>
        <span>🔁 1시간 변화율</span>
        <span>{usd?.percent_change_1h}%</span>
      </OverviewItem>
      <OverviewItem>
        <span>🕐 12시간 변화율</span>
        <span>{usd?.percent_change_12h}%</span>
      </OverviewItem>
      <OverviewItem>
        <span>🕑 24시간 변화율</span>
        <span>{usd?.percent_change_24h}%</span>
      </OverviewItem>
      <OverviewItem>
        <span>📆 30일 변화율</span>
        <span>{usd?.percent_change_30d}%</span>
      </OverviewItem>
    </Overview>
  );
}

export default Price;
