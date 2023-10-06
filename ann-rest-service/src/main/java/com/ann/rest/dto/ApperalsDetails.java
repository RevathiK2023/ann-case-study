package com.ann.rest.dto;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ApperalsDetails {

	@Id
	private Long productId;
	private String productInfo;
	private String manufacturer;
	private String manufacturerAddress;
	private String availableQuantity;
	
	public ApperalsDetails() {}

	public ApperalsDetails(Long productId, String productInfo, String manufacturer, String manufacturerAddress,
			String availableQuantity) {
		super();
		this.productId = productId;
		this.productInfo = productInfo;
		this.manufacturer = manufacturer;
		this.manufacturerAddress = manufacturerAddress;
		this.availableQuantity = availableQuantity;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getProductInfo() {
		return productInfo;
	}

	public void setProductInfo(String productInfo) {
		this.productInfo = productInfo;
	}

	public String getManufacturer() {
		return manufacturer;
	}

	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	public String getManufacturerAddress() {
		return manufacturerAddress;
	}

	public void setManufacturerAddress(String manufacturerAddress) {
		this.manufacturerAddress = manufacturerAddress;
	}

	public String getAvailableQuantity() {
		return availableQuantity;
	}

	public void setAvailableQuantity(String availableQuantity) {
		this.availableQuantity = availableQuantity;
	}
}
