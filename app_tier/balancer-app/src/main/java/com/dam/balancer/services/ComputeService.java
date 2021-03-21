package com.dam.balancer.services;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.dam.balancer.common.TransactionData;

@Service
public class ComputeService {
	
	@Autowired
	private DiscoveryClient discoveryClient;
	
	@Value("${com.dam.balancer.compute-uri}")
	private String computeRelativeUri;
	
	@Value("${com.dam.balancer.compute-service-name}")
	private String computeServiceName;
	
	private Logger logger = LoggerFactory.getLogger(ComputeService.class);
	
	public List<TransactionData> getBalance(Map<Long, Float> userIdToNet) {
		List<TransactionData> transactions = null;
		
		List<ServiceInstance> list = discoveryClient.getInstances(computeServiceName);
		if (list != null && list.size() > 0) {
			logger.info("Found services for " + computeServiceName);
			
			URI serviceInstanceURI = list.get(0).getUri();
			URI computeURI = serviceInstanceURI.resolve(computeRelativeUri);
			
			if (computeURI != null) {
				logger.info("sending balance request to " + computeURI.toString());

				RestTemplate restTemplate = new RestTemplate();
				
				// Create request body
				MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
		        headers.add("Content-Type", "application/json");
		        HttpEntity<?> requestBody = new HttpEntity<>(userIdToNet, headers);
				
				ResponseEntity<List<TransactionData>> response =
				        restTemplate.exchange(computeURI,
				                    HttpMethod.POST, requestBody, new ParameterizedTypeReference<List<TransactionData>>() {
				            });
				transactions = response.getBody();
			}
		}
		else {
			logger.warn("Cannot find service for %s", computeServiceName);
		}
		return transactions;

	}
}
