package com.ann.rest.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ann.rest.dto.ApperalsDetails;

@Service
public class ApperalsDetailsJpaResource {

	@Autowired
	private ApperalsDetailsJpaRepository apperalDetailsJpaRepository;

	public Optional<ApperalsDetails> getApperalsDetailsByProductId(Long id){
		return apperalDetailsJpaRepository.findById(id);
	}
	
	public ApperalsDetails addApperalsDetails(ApperalsDetails details){
		return apperalDetailsJpaRepository.save(details);
	}
}
