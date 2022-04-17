import axios from "axios";

const axiosBase = axios.create({
    baseURL:"https://api-rinkeby.etherscan.io",
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosBase;