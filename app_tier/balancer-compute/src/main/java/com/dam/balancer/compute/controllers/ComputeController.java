package com.dam.balancer.compute.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@GetMapping("/")
	public List<TransactionData> computeBalance(Map<Long, Float> userIdToNet) {
		return balanceCalculator.getBalance(userIdToNet);
	}
	
}
