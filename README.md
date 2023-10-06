"# ann-case-study" 
ann-rest-service --> this folder has back end spring boot application
amplify-react-application --> this folder has front end react ui.

On LAB/lab-session


ALB: elb-public-1
ALB Target group: elb-public-tg-1

NLB: nlb-public-1
NLB Target group: nlb-public-tg-1

Security group: default

ECS Cluster: cluster-ann
Task definition: taskdef-ann

API Gateway: ann-api-one

S3: revathiannbucket1

Cognito pool: ann-user-pool

Dockerhub image: docker.io/revathik2023/ann-rest-service:1.0

RDS: anndbinstance

SNS Topic: addproduct

ELB endpoint: http://elb-public-1-1088807216.us-east-1.elb.amazonaws.com/apperals/search-all
NLB endpoint: http://nlb-public-1-c166f5474a07b48a.elb.us-east-1.amazonaws.com/apperals/search-all
API Gateway: https://v07xr81mib.execute-api.us-east-1.amazonaws.com/test

S3 hosted static webpage: http://revathiannbucket1.s3-website-us-east-1.amazonaws.com/
	--> ann-api-one --> nlb-public-1 --> elb-public-tg-1 --> service4
														 --> service6