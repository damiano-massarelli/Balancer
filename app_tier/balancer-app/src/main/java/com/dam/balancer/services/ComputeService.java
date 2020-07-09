package com.dam.balancer.services;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.dam.balancer.common.TransactionData;

@Service
public class ComputeService {

	@Autowired
	private DiscoveryClient discoveryClient;
	
	public List<TransactionData> getBalance(Map<Long, Float> userIdToNet) {
		List<TransactionData> transactions = null;
		
		List<ServiceInstance> list = discoveryClient.getInstances("balancer-compute-min");
		if (list != null && list.size() > 0) {
			URI uri = list.get(0).getUri();
			if (uri != null) {
				RestTemplate restTemplate = new RestTemplate();
				ResponseEntity<List<TransactionData>> rateResponse =
				        restTemplate.exchange(uri,
				                    HttpMethod.GET, null, new ParameterizedTypeReference<List<TransactionData>>() {
				            });
				transactions = rateResponse.getBody();
			}
		}
		return transactions;

	}
}
