// deployed locally
// export const API_URL = 'http://localhost:8080'
// deployed on ECS service/task
// export const API_URL = 'http://3.239.70.167:8080'
// accessing via ELB
// export const API_URL = 'http://elb-public-1-1088807216.us-east-1.elb.amazonaws.com/'
// accessing via NLB
// export const API_URL = 'http://nlb-public-1-c166f5474a07b48a.elb.us-east-1.amazonaws.com'
// accessing via API Gateway - HTTP APIs - test stage
export const API_URL = 'https://v07xr81mib.execute-api.us-east-1.amazonaws.com/test'
// accessing via API Gateway - HTTP APIs - prod stage
//export const API_URL = 'https://v07xr81mib.execute-api.us-east-1.amazonaws.com/prod'


//export const APPERAL_API_URL = 'http://rest-api-qa.eba-qwx9ap5p.us-east-1.elasticbeanstalk.com'
export const APPERAL_API_URL = `${API_URL}/apperals`
export const SEARCH_ALL_APPERAL_API_URL = `${APPERAL_API_URL}/search-all`
export const SEARCH_TEXT_APPERAL_API_URL = `${APPERAL_API_URL}/search/`
export const ADD_APPERAL_API_URL = `${APPERAL_API_URL}/addapperal`
export const GET_APPERAL_API_URL = `${APPERAL_API_URL}/apperals/`