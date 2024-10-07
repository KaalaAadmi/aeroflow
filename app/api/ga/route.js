import { BetaAnalyticsDataClient } from "@google-analytics/data";
const property_id = process.env.GOOGLECLIENT_ID;
export const GET = async (req, res) => {
  const analyticsDataClient = new BetaAnalyticsDataClient();
};
