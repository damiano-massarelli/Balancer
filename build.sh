PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "\n======== Building Balancer ========"
echo -e "\n${PURPLE}- Building App${NC}\n"
(cd app_tier/balancer-app/ && gradle build)
echo -e "\n${PURPLE}- Building Compute Service${NC}\n"
(cd app_tier/balancer-compute/ && gradle build) 
echo -e "\n${PURPLE}- Building Discovery Service${NC}\n"
(cd app_tier/eureka-server/ && gradle build) 
echo -e "\n${PURPLE}- Building React${NC}\n"
(cd web_tier/ && npm run build) 