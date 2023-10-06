package com.ann.rest.aws.services;

import java.util.HashMap;
import java.util.Map;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClient;
import com.amazonaws.services.sns.model.MessageAttributeValue;
import com.amazonaws.services.sns.model.PublishRequest;
import com.amazonaws.services.sns.model.PublishResult;

public class SnsTopicService {
	
	public void sendToSnSTopic(String message) {
		AmazonSNS snsClient = AmazonSNSClient.builder().withRegion(Regions.US_EAST_1).build();
		Map<String, MessageAttributeValue> snsAttributes = new HashMap<>();
		snsAttributes.put("AWS.SNS.SMS.SenderID", new MessageAttributeValue().withStringValue("ANN").withDataType("String"));
		snsAttributes.put("AWS.SNS.SMS.SMSType", new MessageAttributeValue().withStringValue("Trans").withDataType("String"));
		
		PublishResult result = snsClient.publish(new PublishRequest()
				.withTargetArn("arn:aws:sns:us-east-1:060128401829:addproduct")
				.withMessage(message).withMessageAttributes(snsAttributes));
		System.out.println("Message sent: " + result.getMessageId());
	}

}
