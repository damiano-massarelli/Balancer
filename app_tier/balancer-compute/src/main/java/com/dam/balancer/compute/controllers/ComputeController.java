package com.dam.balancer.compute.controllers;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dam.balancer.common.TransactionData;
import com.dam.balancer.compute.balance.AbstractBalanceCalculator;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/compute")
public class ComputeController {
	
	@Autowired
	private AbstractBalanceCalculator balanceCalculator;
	
	private Logger logger = LoggerFactory.getLogger(ComputeController.class);
	
	@PostMapping("/")
	public List<TransactionData> computeBalance(@RequestBody Map<Long, Float> userIdToNet) {
		logger.info("compute request received");
		return balanceCalculator.getBalance(userIdToNet);
	}
	
}
