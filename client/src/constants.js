const ENV = 'prod';
const urls = {
    prod: 'https://newsserver-vrh0.onrender.com',
    dev: 'http://localhost:5000',
};        
const url = urls[ENV];
export default url;


