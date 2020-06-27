package com.dam.balancer.model.representational;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import com.dam.balancer.controllers.ExpenseController;
import com.dam.balancer.model.Expense;
import com.dam.balancer.model.User;

@Component
public class ExpenseModelAssembler implements RepresentationModelAssembler<Expense, ExpenseModel> {

	@Autowired
	private UserModelAssembler userModelAssembler;
	
	@Override
	public ExpenseModel toModel(Expense entity) {
		Collection<ExpenseModel.DebtorToDebtModel> debtor2debtCollection = entity.getDebtorToDebt().entrySet().stream()
		.map(d2d -> new ExpenseModel.DebtorToDebtModel(userModelAssembler.toModel(d2d.getKey()), d2d.getValue()))
		.collect(Collectors.toList());
		
		CollectionModel<ExpenseModel.DebtorToDebtModel> debtor2debt = new CollectionModel<ExpenseModel.DebtorToDebtModel>(debtor2debtCollection);
		
		EntityModel<User> creditorModel = userModelAssembler.toModel(entity.getCreditor());
		
		return new ExpenseModel(entity.getId(), entity.getTitle(), creditorModel, debtor2debt, entity.getDate(), entity.getAmount());
	}

	@Override
	public CollectionModel<ExpenseModel> toCollectionModel(Iterable<? extends Expense> entities) {
		// Add link to self
		CollectionModel<ExpenseModel> collection = RepresentationModelAssembler.super.toCollectionModel(entities);
		collection.add( linkTo( methodOn(ExpenseController.class).all() ).withSelfRel() );
		return collection;
	}
}
