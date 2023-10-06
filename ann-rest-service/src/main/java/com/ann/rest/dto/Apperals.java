package com.ann.rest.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.mysql.cj.jdbc.Blob;

@Entity
public class Apperals {

	@Id
	@GeneratedValue
	private Long productId;
	private String productName;
	private String productDesc;
	private String price;
	private String imageLocation;
	private byte[] image;
	
	public Apperals() {}
	
	public Apperals(Long id, String productName, String productDesc) {
		setProductId(id);
		setProductName(productName);
		setProductDesc(productDesc);
	}

	public Long getProductId() {
		return productId;
	}
	
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	
	public String getProductName() {
		return productName;
	}
	
	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	public String getProductDesc() {
		return productDesc;
	}
	
	public void setProductDesc(String productDesc) {
		this.productDesc = productDesc;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getImageLocation() {
		return imageLocation;
	}

	public void setImageLocation(String imageLocation) {
		this.imageLocation = imageLocation;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}
}
