package com.ann.rest.aws.services;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;



public class S3BucketService {

	String bucketName = "revathiannbucket1";
	String apperalsFolder = "images/apperals/";
	Regions clientRegion = Regions.US_EAST_1;
	
	AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
            .withRegion(clientRegion)
            .build();
	
	
	public void uploadFileToBucket(String fileName, File imageFile) {

		
         // Upload a file as a new object with ContentType and title specified.
         PutObjectRequest request = new PutObjectRequest(bucketName, fileName, imageFile);
         ObjectMetadata metadata = new ObjectMetadata();
         
         metadata.addUserMetadata("image", "image");
         request.setMetadata(metadata);
         s3Client.putObject(request);
	}
}
