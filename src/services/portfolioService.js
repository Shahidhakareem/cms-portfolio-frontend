import axios from "axios";

export const getPortfolioData = async () => {
  const res = await axios.get(
    "http://localhost:5000/api/portfolio/get-portfolio-data"
  );
  return res.data;
};
