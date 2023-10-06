package com.ann.rest.apperal.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ann.rest.aws.services.S3BucketService;
import com.ann.rest.aws.services.SnsTopicService;
import com.ann.rest.dto.ApperalData;
import com.ann.rest.dto.Apperals;
import com.ann.rest.dto.ApperalsDetails;
import com.ann.rest.repository.ApperalsDetailsJpaResource;
import com.ann.rest.repository.ApperalsJpaResource;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class ApperalsServiceController {

	@Autowired
	ApperalsJpaResource apperalsJpaResource;
	@Autowired
	ApperalsDetailsJpaResource apperalsDetailsJpaResource;
	
	SnsTopicService snsTopicService = new SnsTopicService();
	
	S3BucketService s3Service = new S3BucketService();
	
//	@GetMapping(path = "/search-all")
	@GetMapping("/search-all")
	public String searchAllApperals() {
		
		List<Apperals> apperals = apperalsJpaResource.getAllApperals();
		ObjectMapper mapper = new ObjectMapper();
		String json = null;
		try {
		  json = mapper.writeValueAsString(apperals);
//		  System.out.println("ResultingJSONstring = " + json);
		  System.out.println("Returning JSON resonse");
		} catch (JsonProcessingException e) {
		   e.printStackTrace();
		}
		
		return json;
	}
	
	// Have to change to RequestBody type param
	@GetMapping("/search/{text}")
	public String searchApperals(@PathVariable String text) {
		List<Apperals> apperals = apperalsJpaResource.getApperalsBySearchText(text);
		ObjectMapper mapper = new ObjectMapper();
		String json = null;
		try {
		  json = mapper.writeValueAsString(apperals);
		  System.out.println("Returning JSON resonse");
		} catch (JsonProcessingException e) {
		   e.printStackTrace();
		}
		
		return json;
	}
	

	@GetMapping("/apperals/{id}")
	public String getApperalById(@PathVariable Long id) {
		
		Optional<ApperalsDetails> apperalDetails = apperalsDetailsJpaResource.getApperalsDetailsByProductId(id);
		
		ObjectMapper mapper = new ObjectMapper();
		String json = null;
//		StringBuilder string = new StringBuilder();
		
		if (apperalDetails.isPresent()) {
			ApperalsDetails details = apperalDetails.get();
			try {
				  json = mapper.writeValueAsString(details);
				  System.out.println("Resulting apperalDetails JSON string = " + json);
			} catch (JsonProcessingException e) {
			   e.printStackTrace();
			}
			
			
			
//			string.append("<html>");
//			string.append("<head>");
//			string.append("</head>");
//			string.append("<body>");
//			string.append("<div>");
//			string.append("<h2>" + details.getProductId() + "</h2>");
//			string.append("<h3>" + details.getManufacturer() + "</h3>");
//			string.append("<h3>" + details.getAvailableQuantity() + "</h3>");
//			string.append("</div>");
//			string.append("</body>");
//			string.append("</html>");
			
		}
//		return string.toString();
		return json;
	}
	
	@PostMapping("/addapperal")
	@ResponseBody
//	public String addApperal(@RequestBody ApperalData data) {
	public String addApperal(@ModelAttribute ApperalData data) {
		
		System.out.println("Adding apperal --> productName:" + data.getProductName() + "; productDesc: " + data.getProductDesc() 
				+ "; imageLocation: " + data.getImageFile().getName() + "; productInfo: " + data.getProductInfo() 
				+ "; manufacturer: " + data.getManufacturer() + "; manufacturerAddress: " + data.getManufacturerAddress() 
				+ "; availableQuantity: " + data.getAvailableQuantity());
		System.out.println("getOriginalFilename(): " + data.getImageFile().getOriginalFilename());
		
//		File imageFile = convertToFile(data.getImageFile().getOriginalFilename(), data.getImageFile());
//		s3Service.uploadFileToBucket(data.getImageFile().getOriginalFilename(), imageFile);
		
		Apperals toSave = new Apperals();
		toSave.setProductName(data.getProductName());
		toSave.setProductDesc(data.getProductDesc());
		toSave.setPrice(data.getPrice());
		//toSave.setImageLocation(data.getImageLocation());
		try {
			toSave.setImage(data.getImageFile().getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		Apperals savedApperal = apperalsJpaResource.addApperal(toSave);
		System.out.println("Adding apperal with ID: " + savedApperal.getProductId());
		
		ApperalsDetails detailsToSave = new ApperalsDetails();
		detailsToSave.setProductId(savedApperal.getProductId());
		detailsToSave.setProductInfo(data.getProductInfo());
		detailsToSave.setManufacturer(data.getManufacturer());
		detailsToSave.setManufacturerAddress(data.getManufacturerAddress());
		detailsToSave.setAvailableQuantity(data.getAvailableQuantity());
		
		ApperalsDetails savedDetails = apperalsDetailsJpaResource.addApperalsDetails(detailsToSave);
		
		String message = "New Product added to catalogue with Product ID: " + savedApperal.getProductId();
//		snsTopicService.sendToSnSTopic(message);
		
		return message;
	}
	
	private File convertToFile(String fileName, MultipartFile multipartFile) {
		File tempImage = new File(fileName);
		try {
			if(tempImage.createNewFile()) {
				System.out.println("Created new temp file.");
			}
			multipartFile.transferTo(tempImage);
			System.out.println("temp image file: " + tempImage.getAbsoluteFile());
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
		return tempImage;
	}
}
