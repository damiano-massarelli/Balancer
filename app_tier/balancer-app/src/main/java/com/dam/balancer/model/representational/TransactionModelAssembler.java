package com.dam.balancer.model.representational;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import com.dam.balancer.model.Transaction;

@Component
public class TransactionModelAssembler implements RepresentationModelAssembler<Transaction, TransactionModel>{

	@Autowired
	private UserModelAssembler userModelAssembler;
	
	@Override
	public TransactionModel toModel(Transaction entity) {
		return new TransactionModel(userModelAssembler.toModel(entity.getFrom()), userModelAssembler.toModel(entity.getTo()), entity.getAmount());
	}

}
