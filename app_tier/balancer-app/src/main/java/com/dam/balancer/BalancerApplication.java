package com.dam.balancer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class BalancerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BalancerApplication.class, args);
	}

}
