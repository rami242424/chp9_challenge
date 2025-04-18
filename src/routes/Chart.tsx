import React from "react";
import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useTheme } from "styled-components";
import { fetchCoinHistory } from "../api";

interface ChartProps {
  coinId: string;
}

interface IOHLCV {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const theme = useTheme(); 
  const isDark = theme.mode === "dark";

  const { isLoading, data } = useQuery<IOHLCV[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map((price) => ({
                  x: new Date(price.time_open),
                  y: [
                    price.open,
                    price.high,
                    price.low,
                    price.close,
                  ],
                })) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              background: "transparent",
              toolbar: { show: false },
              foreColor: isDark ? "#f5f6fa" : "#2f3640",
            },
            xaxis: {
              type: "datetime",
              labels: {
                style: {
                  colors: isDark ? "#f5f6fa" : "#2f3640", 
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: isDark ? "#f5f6fa" : "#2f3640", 
                },
              },
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
