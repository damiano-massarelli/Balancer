package com.dam.balancer.common;

/**
 * Simple communication class used by the balancer app and compute services.
 */
public class TransactionData {
    Long fromId = -1l;
    Long toId = -1l;
    float amount = 0.f;
    
    public TransactionData() {
    	this(-1l, -1l, 0.f);
    }
    
	public TransactionData(Long fromId, Long toId, float amount) {
		this.fromId = fromId;
		this.toId = toId;
		this.amount = amount;
	}

	public Long getFromId() {
		return fromId;
	}

	public void setFromId(Long fromId) {
		this.fromId = fromId;
	}

	public Long getToId() {
		return toId;
	}

	public void setToId(Long toId) {
		this.toId = toId;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}
}
