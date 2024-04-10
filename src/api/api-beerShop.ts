import axios from "axios";

const instance = axios.create({
    baseURL: "https://beers-list.p.rapidapi.com",
    headers: {
        'X-RapidAPI-Key': '95883a72e9mshb07ec2903b5bc8fp11bf88jsneece67684b49',
        'X-RapidAPI-Host': 'beers-list.p.rapidapi.com'
    }
});

export const beerShopAPI = {
    getBeerAll() {
        return instance.get('/beers/')
    },
}